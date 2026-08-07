package transaction

import (
	"fmt"
	"mm/config"
	"mm/src/dto"
	"mm/src/models"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func createIncomeTransaction(uid uuid.UUID, info dto.CreateTransactionRequest) (*models.Transaction, error) {
	var user models.User
	err := config.DB.Where("id = ?", uid).First(&user).Error
	if err != nil {
		return nil, fmt.Errorf("failed to find user and create transaction")
	}
	var party models.Party
	err = config.DB.
		Where(`
			id = ? and user_id = ? and role = 'INCOME'
		`, info.PartyID, uid).First(&party).Error
	if err != nil {
		if err.Error() == gorm.ErrRecordNotFound.Error() {
			return nil, fmt.Errorf("party not assoiced with user")
		}

		return nil, fmt.Errorf("failed to find party and create transaction")
	}

	trans := models.Transaction{
		UserID:      uid,
		PartyID:     info.PartyID,
		Type:        info.Type,
		Amount:      int64(info.Amount),
		Description: info.Description,
		// TransactionDate: info.Date,
	}
	if info.Date != nil {
		trans.Date, err = time.Parse("2006-01-02 15:04:05", *info.Date)
		if err != nil {
			trans.Date = time.Now()
		}
	} else {
		trans.Date = time.Now()
	}

	// save start
	tx := config.DB.Begin()

	if err := tx.Create(&trans).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Model(&party).Update("balance", party.Balance+trans.Amount).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// Commit
	if err := tx.Commit().Error; err != nil {
		return nil, err
	}

	return &trans, nil
}
