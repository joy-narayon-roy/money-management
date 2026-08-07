package user

import (
	"mm/config"
	"mm/src/models"

	"github.com/google/uuid"
)

type GetTransactionsOptions struct {
	Limit uint                   `query:"limit"`
	Page  uint                   `query:"page"`
	ID    uuid.UUID              `query:"id"`
	Type  models.TransactionType `query:"type"`
}

type GetTransactionsResult struct {
	Total        int64                `json:"total"`
	Limit        uint                 `json:"limit"`
	Page         uint                 `json:"page"`
	Transactions []models.Transaction `json:"transactions"`
}

func (UserServiceStruct) GetTransactions(id uuid.UUID, opt GetTransactionsOptions) (GetTransactionsResult, error) {
	if opt.Limit <= 0 {
		opt.Limit = 1
	}
	if opt.Page <= 0 {
		opt.Page = 1
	}
	offset := opt.Limit * (opt.Page - 1)

	query := config.DB.Model(&models.Transaction{})
	query.Limit(int(opt.Limit)).Offset(int(offset)).Where("user_id", id)

	res := GetTransactionsResult{
		Limit: opt.Limit,
		Page:  opt.Page,
	}

	query.Count(&res.Total)
	err := query.Find(&res.Transactions).Error
	if err != nil {
		return res, err
	}
	return res, nil
}
