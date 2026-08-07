package user

import (
	"mm/config"
	"mm/src/models"

	"github.com/google/uuid"
)

type CurrentBalanceResponse struct {
	OpeningBalance int64 `json:"opening_balance"`
	CurrentBalance int64 `json:"current_balance"`
}

func (UserServiceStruct) GetUserCurrentBalance(userID uuid.UUID) (*CurrentBalanceResponse, error) {
	db := config.DB

	var user models.User
	if err := db.
		Select("opening_balance").
		First(&user, "id = ?", userID).Error; err != nil {
		return nil, err
	}

	var balanceChange int64

	err := db.Model(&models.Transaction{}).
		Where("user_id = ?", userID).
		Select(`
			COALESCE(SUM(
				CASE
					WHEN type = 'INCOME' THEN amount
					WHEN type = 'AR_PAYMENT' THEN amount
					WHEN type = 'EXPENSE' THEN -amount
					WHEN type = 'AP_PAYMENT' THEN -amount
					ELSE 0
				END
			), 0)
		`).
		Scan(&balanceChange).Error

	if err != nil {
		return nil, err
	}

	return &CurrentBalanceResponse{
		OpeningBalance: user.OpeningBalance,
		CurrentBalance: user.OpeningBalance + balanceChange,
	}, nil
}
