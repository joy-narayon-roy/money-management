package party

import (
	"fmt"
	"mm/config"
	"mm/src/models"
)

type GetPartiesOptions struct {
	Limit int `query:"limit" json:"limit"`
	Page  int `query:"page" json:"page"`
}

func (PartyService) GetParties(opt GetPartiesOptions) ([]models.Party, error) {

	var results []models.Party

	limit := opt.Limit
	if limit <= 0 {
		limit = 10
	}
	page := opt.Page
	if page <= 0 {
		page = 1
	}
	offset := (page - 1) * limit

	err := config.DB.Table("party").
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
		Order("party.id").
		Limit(limit).
		Offset(offset).
		Scan(&results).Error

	if err != nil {
		fmt.Println("ERROR:", err)
		return nil, err
	}

	return results, nil
}
