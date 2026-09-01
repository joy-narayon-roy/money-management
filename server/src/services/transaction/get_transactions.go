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
	Party []string                `query:"party"`
}

type PaginationType struct {
	Page      int   `json:"page"`
	Limit     int   `json:"limit"`
	Total     int64 `json:"total"`
	TotalPage int   `json:"total_pages"`
}

func (p *PaginationType) calculateTotalPages() {
	if p.Limit <= 0 {
		p.TotalPage = 0
	}
	if p.Total == 0 {
		p.TotalPage = 0
	}
	p.TotalPage = int((p.Total + int64(p.Limit) - 1) / int64(p.Limit))
}

type TransactionQueryResult struct {
	Transactions []models.Transaction `json:"transactions"`
	Pagination   PaginationType       `json:"pagination"`
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
	if len(opt.Party) > 0 {
		baseQuery = baseQuery.Where("party_id in (?)", opt.Party)
	}

	result := &TransactionQueryResult{}

	// Count total records before pagination
	if err := baseQuery.Count(&result.Pagination.Total).Error; err != nil {
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
	result.Pagination.Limit = int(opt.Limit)
	result.Pagination.Page = int(opt.Page)
	result.Pagination.calculateTotalPages()

	return result, nil
}
