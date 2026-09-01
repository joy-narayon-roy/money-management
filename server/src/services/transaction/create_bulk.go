package transaction

import (
	"mm/config"
	"mm/src/dto/dto_transaction"
	"mm/src/models"

	"github.com/google/uuid"
)

func (TransactionService) CreateBulk(uid uuid.UUID, infos dto_transaction.CreateBulkTransactionRequest) (dto_transaction.CreateBulkTransactionResult, error) {
	res := dto_transaction.CreateBulkTransactionResult{}
	btve := dto_transaction.BulkTransactionValidationError{}

	trs_map := map[int]*models.Transaction{}
	party_ids := []uuid.UUID{}
	for i, info := range infos {
		tr, tve := info.ConvertTransaction(uid)
		if tve == nil {
			// trs = append(trs, tr)
			trs_map[i] = &tr
			party_ids = append(party_ids, tr.PartyID)
		}
		btve[i] = tve
	}

	var parties []models.Party
	err := config.DB.Table("party").
		Select(`
		party.id,
		party.role,
		CASE
			WHEN party.role IN ('AP', 'AR') THEN COALESCE(t.total, 0) - COALESCE(t.paied, 0)
			ELSE 0
		END AS due
		`).
		Joins(`
		LEFT JOIN (
			SELECT party_id, SUM(
					CASE
						WHEN type IN (
							'INCOME', 'EXPENSE', 'AP', 'AR'
						) THEN amount
						ELSE 0
					END
				) AS total, SUM(
					CASE
						WHEN type IN ('AR_PAYMENT', 'AP_PAYMENT') THEN amount
						ELSE 0
					END
				) AS paied
			FROM transaction
			GROUP BY
				party_id
		) t ON t.party_id = party.id
		`).
		Where(`id in (?) and user_id = ?`, party_ids, uid).
		Find(&parties).Error

	if err != nil {
		return res, err
	}

	parties_map := map[uuid.UUID]*models.Party{}
	for _, p := range parties {
		parties_map[p.ID] = &p
	}

	filtered_trs := []models.Transaction{}
	for i, tr := range trs_map {
		if tr == nil {
			continue
		}
		exists_party := parties_map[tr.PartyID]
		if exists_party != nil {
			tr_party_role := string(tr.Type)
			tr_party_due := 0
			if tr.Type == models.TransactionTypeAPPayment {
				tr_party_role = "AP"
				tr_party_due = int(tr.Amount)
			} else if tr.Type == models.TransactionTypeARPayment {
				tr_party_due = int(tr.Amount)
				tr_party_role = "AR"
			}

			if string(exists_party.Role) == tr_party_role && exists_party.Due >= int64(tr_party_due) {
				filtered_trs = append(filtered_trs, *tr)

			} else {
				exists_err := btve[i]
				vem := "party not found"
				ve := dto_transaction.TransactionValidationError{
					PartyID: &vem,
				}
				if exists_err != nil {
					btve[i].MargeError(ve)
				} else {
					btve[i] = &ve
				}
			}

		} else {
			exists_err := btve[i]
			vem := "party not found"
			ve := dto_transaction.TransactionValidationError{
				PartyID: &vem,
			}
			if exists_err != nil {
				btve[i].MargeError(ve)
			} else {
				btve[i] = &ve
			}
		}
	}
	err = config.DB.Save(&filtered_trs).Error
	res.Errors = btve
	res.Transactions = filtered_trs
	if err != nil {
		return res, err
	}
	return res, nil
}
