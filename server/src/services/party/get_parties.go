package party

import (
	"fmt"
	"mm/config"
	"mm/src/utils"

	"github.com/google/uuid"
)

var partySortWhitelist = map[string]string{
	"name":              "party.name",
	"role":              "party.role",
	"created_at":        "party.created_at",
	"total":             "total",             // alias from subquery
	"paied":             "paied",             // alias from subquery
	"due":               "due",               // computed alias
	"total_transaction": "total_transaction", // alias from subquery
}

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

	query := config.DB.
		// Debug().
		Table("party").
		Select(`
			party.id,
			party.name,
			party.is_active,
			party.role,
			party.description,
			party.user_id,
			party.created_at,
			party.updated_at,
			party.user_id,
			COALESCE(t.total, 0) AS total,
			COALESCE(t.paied, 0) AS paied,
			CASE
				WHEN party.role IN ('AP', 'AR')
					THEN COALESCE(t.total, 0) - COALESCE(t.paied, 0)
				ELSE 0
			END AS due,
			COALESCE(t.total_transaction, 0) AS total_transaction
		`).
		Joins(`
			LEFT JOIN (
				SELECT
					party_id,
					SUM(CASE WHEN type IN ('INCOME','EXPENSE','AP','AR') THEN amount ELSE 0 END) AS total,
					SUM(CASE WHEN type IN ('AR_PAYMENT','AP_PAYMENT') THEN amount ELSE 0 END) AS paied,
					COUNT(id) AS total_transaction
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

	sorts := utils.BuildSortOrderClause(opt.Sort, partySortWhitelist, "updated_at DESC")

	err := query.
		Order(sorts).
		Limit(limit).Offset(offset).Scan(&results.Parties).Error

	if err != nil {
		fmt.Println("ERROR:", err)
		return nil, err
	}

	results.Pagination.calculateTotalPages()
	return &results, nil
}
