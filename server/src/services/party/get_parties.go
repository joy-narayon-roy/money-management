package party

import (
	"fmt"
	"mm/config"

	"github.com/google/uuid"
)

func (PartyService) GetParties(uid uuid.UUID, opt GetPartiesOptions) (*GetPartiesResult, error) {

	results := GetPartiesResult{}

	limit := opt.Limit
	if limit <= 0 {
		limit = 10
	}
	page := opt.Page
	if page <= 0 {
		page = 1
	}
	offset := (page - 1) * limit
	results.Pagination.Limit = limit
	results.Pagination.Page = page

	query := config.DB.Table("party").
		Select(`
			party.*,
			COALESCE(t.total, 0) AS total,
			COALESCE(t.paied, 0) AS paied,
			CASE
				WHEN party.role IN ('AP', 'AR')
					THEN COALESCE(t.total, 0) - COALESCE(t.paied, 0)
				ELSE 0
			END AS due
		`).
		Joins(`
			LEFT JOIN (
				SELECT
					party_id,
					SUM(CASE WHEN type IN ('INCOME','EXPENSE','AP','AR') THEN amount ELSE 0 END) AS total,
					SUM(CASE WHEN type IN ('AR_PAYMENT','AP_PAYMENT') THEN amount ELSE 0 END) AS paied
				FROM transaction
				GROUP BY party_id
			) t ON t.party_id = party.id
		`).
		Where("user_id = ?", uid)
	if len(opt.Role) > 0 {
		query = query.Where("role in (?)", opt.Role)
	}
	if opt.IsAcitve != nil {
		query = query.Where("is_active = ?", *opt.IsAcitve)
	}

	query.Count(&results.Pagination.Total)

	err := query.Order("party.id").Limit(limit).Offset(offset).Scan(&results.Parties).Error

	if err != nil {
		fmt.Println("ERROR:", err)
		return nil, err
	}

	results.Pagination.calculateTotalPages()
	return &results, nil
}
