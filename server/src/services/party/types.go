package party

import "mm/src/models"

type GetPartiesOptions struct {
	Limit    int       `query:"limit" json:"limit"`
	Page     int       `query:"page" json:"page"`
	Role     []*string `query:"role" json:"role"`
	IsAcitve *bool     `query:"is_active"`
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

type GetPartiesResult struct {
	Parties    []models.Party `json:"parties"`
	Pagination PaginationType `json:"pagination"`
}
