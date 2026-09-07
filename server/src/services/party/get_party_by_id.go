package party

import (
	"fmt"
	"mm/config"
	"mm/src/models"

	"github.com/google/uuid"
)

func (PartyService) GetPartyById(uid uuid.UUID, party_id uuid.UUID, opt GetPartiesOptions) (*models.Party, error) {

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
		Where("user_id = ? and id = ?", uid, party_id)

	var party models.Party
	err := query.Order("party.id").First(&party).Error

	if err != nil {
		fmt.Println("ERROR:", err)
		return nil, err
	}
	return &party, nil
}
