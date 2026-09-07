package dto

import "mm/src/models"

type Party struct {
	models.Party
	TotalTrasnactions int64 `gorm:"column:total_transaction" json:"total_transaction"`
}

type PartyValidationError struct {
	Name        *string `json:"name,omitempty"`
	Role        *string `json:"role,omitempty"`
	IsActive    *string `json:"is_active,omitempty"`
	Description *string `json:"description,omitempty"`
}

func (s *PartyValidationError) IsAnyError() bool {
	return s != nil &&
		(s.Name != nil ||
			s.Role != nil ||
			s.IsActive != nil ||
			s.Description != nil)
}

type CreatePartyRequest struct {
	Name        string           `json:"name" validate:"required"`
	Role        models.PartyRole `json:"role" validate:"required"`
	IsActive    bool             `json:"is_active"`
	Description string           `json:"description"`
}

type CreatePartyResponse struct {
	Party           *models.Party         `json:"party"`
	ValidationError *PartyValidationError `json:"validation_error"`
	Error           error                 `json:"error"`
}

type UpdatePartyRequest struct {
	Name        string  `json:"name"`
	IsActive    *bool   `json:"is_active"`
	Description *string `json:"description"`
}
