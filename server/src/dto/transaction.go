package dto

import (
	"mm/src/models"

	"github.com/google/uuid"
)

type CreateTransactionRequest struct {
	Type        models.TransactionType `json:"type"`
	PartyID     uuid.UUID              `json:"party_id"`
	Amount      uint64                 `json:"amount"`
	Description string                 `json:"description"`
	Date        *string                `json:"date"`
}
