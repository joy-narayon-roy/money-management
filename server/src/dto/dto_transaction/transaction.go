package dto_transaction

import (
	"encoding/json"
	"mm/src/models"
	"time"

	"github.com/google/uuid"
)

type CreateTransactionRequest struct {
	Type        models.TransactionType `json:"type"`
	PartyID     uuid.UUID              `json:"party_id"`
	Amount      uint64                 `json:"amount"`
	Description string                 `json:"description"`
	Date        *string                `json:"date"`
}

const dateLayout = "2006-01-02"

func strPtr(s string) *string {
	return &s
}

func (ctr CreateTransactionRequest) Validate() *TransactionValidationError {
	err := TransactionValidationError{}
	err_exists := false

	if !ctr.Validate_transaction_type(string(ctr.Type)) {
		err_exists = true
		err.Type = strPtr("invalid transaction type")
	}
	if ctr.Amount <= 0 {
		err_exists = true
		err.Amount = strPtr("invalid amount")
	}
	if ctr.PartyID == uuid.Nil {
		err_exists = true
		err.PartyID = strPtr("invalid party_id")
	}
	if ctr.Date == nil {
		err_exists = true
		err.Date = strPtr("invalid date")
	} else if _, parseErr := time.Parse(dateLayout, *ctr.Date); parseErr != nil {
		err_exists = true
		err.Date = strPtr("date must be in YYYY-MM-DD format")
	}

	if err_exists {
		return &err
	}

	return nil
}

func (ctr CreateTransactionRequest) ConvertTransaction(uid uuid.UUID) (models.Transaction, *TransactionValidationError) {
	if valErr := ctr.Validate(); valErr != nil {
		return models.Transaction{}, valErr
	}

	date, parseErr := time.Parse(dateLayout, *ctr.Date)
	if parseErr != nil {
		date = time.Now()
	}

	tr := models.Transaction{
		PartyID:     ctr.PartyID,
		Type:        ctr.Type,
		Amount:      int64(ctr.Amount),
		Description: ctr.Description,
		Date:        date,
		UserID:      uid,
	}

	return tr, nil
}

func (CreateTransactionRequest) Validate_transaction_type(st string) bool {
	if st == "" {
		return false
	}
	for _, t := range models.TransactionTypes {
		if st == string(t) {
			return true
		}
	}
	return false
}

func (CreateTransactionRequest) Parse(json_bytes []byte) (CreateTransactionRequest, *TransactionValidationError, error) {
	info := CreateTransactionRequest{}
	validation_err := TransactionValidationError{}
	var json_data map[string]interface{}

	err := json.Unmarshal(json_bytes, &json_data)
	if err != nil {
		return info, nil, err
	}

	isAnyError := false

	// type
	trans_type, trans_type_ok := json_data["type"].(string)
	if !trans_type_ok {
		isAnyError = true
		validation_err.Type = strPtr("invalid type")
	} else {
		if trans_type == "INCOME" {
			info.Type = models.TransactionTypeIncome
		} else if trans_type == "EXPENSE" {
			info.Type = models.TransactionTypeExpense
		} else if trans_type == "AP" {
			info.Type = models.TransactionTypeAP
		} else if trans_type == "AP_PAYMENT" {
			info.Type = models.TransactionTypeAPPayment
		} else if trans_type == "AR" {
			info.Type = models.TransactionTypeAR
		} else if trans_type == "AR_PAYMENT" {
			info.Type = models.TransactionTypeARPayment
		} else {
			isAnyError = true
			validation_err.Type = strPtr("invalid type")
		}
	}

	// amount
	amount, amount_ok := json_data["amount"].(float64)
	if !amount_ok {
		isAnyError = true

		validation_err.Amount = strPtr("invalid amount")
	} else {
		info.Amount = uint64(amount)
	}

	// date
	date, date_ok := json_data["date"].(string)
	if !date_ok {
		isAnyError = true
		validation_err.Date = strPtr("invalid date")
	} else {
		info.Date = &date
	}

	description, description_ok := json_data["description"].(string)
	if !description_ok {
		info.Description = string(info.Type)
	} else {
		info.Description = description
	}

	// party_id
	party_str_id, party_id_str_ok := json_data["party_id"].(string)
	if !party_id_str_ok {
		isAnyError = true
		validation_err.PartyID = strPtr("invalid party id")
	} else {
		info.PartyID, _ = uuid.Parse(party_str_id)
	}

	if isAnyError {
		return info, &validation_err, nil
	}

	return info, nil, nil

}
