package transaction

import (
	"mm/config"
	"mm/src/models"

	"github.com/google/uuid"
)

type TransactionQuery struct {
	Limit uint                    `query:"limit"`
	Page  uint                    `query:"page"`
	Type  *models.TransactionType `query:"type"`
}

type TransactionQueryResult struct {
	Total        int64                `json:"total"`
	Transactions []models.Transaction `json:"transactions"`
}

func (TransactionService) GetTransactions(uid uuid.UUID, opt TransactionQuery) (*TransactionQueryResult, error) {
	if opt.Limit == 0 {
		opt.Limit = 10
	}
	if opt.Page == 0 {
		opt.Page = 1
	}

	offset := (opt.Page - 1) * opt.Limit

	baseQuery := config.DB.Model(&models.Transaction{}).
		Where("user_id = ?", uid)

	if opt.Type != nil {
		baseQuery = baseQuery.Where("type = ?", *opt.Type)
	}

	result := &TransactionQueryResult{}

	// Count total records before pagination
	if err := baseQuery.Count(&result.Total).Error; err != nil {
		return nil, err
	}

	// Fetch paginated records
	if err := baseQuery.
		Order("date DESC").
		Limit(int(opt.Limit)).
		Offset(int(offset)).
		Find(&result.Transactions).Error; err != nil {
		return nil, err
	}

	return result, nil
}
