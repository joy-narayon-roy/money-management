package transaction

// import (
// 	"mm/src/models"
// )

// type TransactionValidationError struct {
// 	Type        string `json:"type"`
// 	PartyID     string `json:"party_id"`
// 	Amount      string `json:"amount"`
// 	Description string `json:"description"`
// 	Date        string `json:"date"`
// }

// func (TransactionValidationError) MargeError(curr TransactionValidationError, new TransactionValidationError) TransactionValidationError {
// 	if curr.Amount != "" {
// 		curr.Amount += ", "
// 	}
// 	curr.Amount = new.Amount

// 	if curr.Date != "" {
// 		curr.Date += ", "
// 	}
// 	curr.Date = new.Date

// 	if curr.Description != "" {
// 		curr.Description += ", "
// 	}
// 	curr.Description = new.Description

// 	if curr.PartyID != "" {
// 		curr.PartyID += ", "
// 	}
// 	curr.PartyID = new.PartyID

// 	if curr.Type != "" {
// 		curr.Type += ", "
// 	}
// 	curr.Type = new.Type

// 	return curr
// }
// func (tve *TransactionValidationError) IsAnyError() bool {
// 	if tve == nil {
// 		return false
// 	}
// 	if tve.Amount != "" || tve.Date != "" || tve.Description != "" || tve.PartyID != "" || tve.Type != "" {
// 		return true
// 	}

// 	return false
// }

// type CreateBulkTransactionResult struct {
// 	Transactions []models.Transaction                `json:"transactions"`
// 	Errors       map[int]*TransactionValidationError `json:"errors"`
// }
