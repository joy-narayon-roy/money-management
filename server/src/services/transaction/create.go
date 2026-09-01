package transaction

import (
	"fmt"
	"mm/config"
	"mm/src/dto/dto_transaction"
	"mm/src/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func (TransactionService) Create(uid uuid.UUID, info dto_transaction.CreateTransactionRequest) (*models.Transaction, *dto_transaction.TransactionValidationError, error) {
	tr_party_role := string(info.Type)
	tr_party_due := 0
	if info.Type == models.TransactionTypeAPPayment {
		tr_party_role = "AP"
		tr_party_due = int(info.Amount)
	} else if info.Type == models.TransactionTypeARPayment {
		tr_party_due = int(info.Amount)
		tr_party_role = "AR"
	}

	var party models.Party

	subQuery := config.DB.Table("party").
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
		Where(`id = ? and user_id = ? and role = ?`, info.PartyID, uid, tr_party_role)

	err := config.DB.
		Table("(?) as pd", subQuery).
		Where("due >= ?", tr_party_due).
		First(&party).Error

	if err != nil {
		if err.Error() == gorm.ErrRecordNotFound.Error() {
			em := "party infomation is not valid"
			return nil, &dto_transaction.TransactionValidationError{PartyID: &em}, nil
		}
		return nil, nil, fmt.Errorf("failed to find party and create transaction")
	}

	trans, verr := info.ConvertTransaction(uid)

	if verr != nil {
		return nil, verr, nil
	}
	// save start
	tx := config.DB.Begin()

	if err := tx.Create(&trans).Error; err != nil {
		tx.Rollback()
		return nil, nil, err
	}

	// Commit
	if err := tx.Commit().Error; err != nil {
		return nil, nil, err
	}

	return &trans, nil, nil
}
