package dto

import "mm/src/models"

type CreatePartyRequest struct {
	Name     string           `json:"name" validate:"required"`
	Role     models.PartyRole `json:"role" validate:"required"`
	IsActive bool             `json:"is_active"`
}

type UpdatePartyRequest struct {
	Name     string `json:"name"`
	IsActive *bool  `json:"is_active"`
}

type CreatePartyResponse struct {
}
