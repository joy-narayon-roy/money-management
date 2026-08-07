package transaction

import (
	"fmt"
	"mm/src/dto"
	"mm/src/models"
	"mm/src/types"

	"github.com/google/uuid"
)

func validator(info dto.CreateTransactionRequest) error {
	if info.Amount <= 0 {
		return fmt.Errorf("amount must be more then 0")
	}
	if info.PartyID == uuid.Nil {
		return fmt.Errorf("invalid party id")
	}
	return nil
}

func (TransactionService) Create(uid uuid.UUID, info dto.CreateTransactionRequest) (*models.Transaction, error) {

	err := validator(info)
	if err != nil {
		return nil, err
	}
	switch info.Type {
	case models.TransactionTypeIncome:
		return createIncomeTransaction(uid, info)
	case models.TransactionTypeExpense:
		return createExpenseTransaction(uid, info)
	default:
		return nil, types.TransactionInvalidType
	}
}
