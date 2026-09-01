package dto_transaction

import (
	"encoding/json"
	"mm/src/models"

	"github.com/google/uuid"
)

type CreateBulkTransactionResult struct {
	Transactions []models.Transaction           `json:"transactions"`
	Errors       BulkTransactionValidationError `json:"validation_errors"`
}

type CreateBulkTransactionRequest []CreateTransactionRequest

func (ctrs CreateBulkTransactionRequest) Validate() *BulkTransactionValidationError {
	validation_errors := BulkTransactionValidationError{}

	isAnyError := false
	for i, ctr := range ctrs {
		ve := ctr.Validate()
		if ve != nil {
			isAnyError = true
		}
		validation_errors[i] = ve
	}

	if isAnyError {
		return &validation_errors
	}

	return nil
}

func (ctrs CreateBulkTransactionRequest) ConvertTransaction(uid uuid.UUID) ([]models.Transaction, *BulkTransactionValidationError) {
	trans := []models.Transaction{}
	if valErr := ctrs.Validate(); valErr != nil {
		return trans, valErr
	}

	bverr := BulkTransactionValidationError{}
	isAnyError := false
	for i, ctr := range ctrs {
		tr, verr := ctr.ConvertTransaction(uid)
		bverr[i] = verr
		if verr == nil {
			trans = append(trans, tr)
		} else {
			isAnyError = true
		}
	}

	if isAnyError {
		return trans, &bverr
	}

	return trans, nil
}

func (CreateBulkTransactionRequest) Parse(json_bytes []byte) (CreateBulkTransactionRequest, *BulkTransactionValidationError, error) {
	cbtr := CreateBulkTransactionRequest{}
	btve := BulkTransactionValidationError{}
	var json_datas []any
	err := json.Unmarshal(json_bytes, &json_datas)
	if err != nil {
		return cbtr, nil, err
	}

	isAnyError := false
	for i, json_data := range json_datas {
		jb, jb_err := json.Marshal(json_data)
		if jb_err != nil {
			continue
		}
		ctr, tverr, _ := CreateTransactionRequest.Parse(CreateTransactionRequest{}, jb)

		btve[i] = tverr
		if tverr == nil {
			cbtr = append(cbtr, ctr)
		} else {
			isAnyError = true
		}

	}
	if isAnyError {
		return cbtr, &btve, nil
	}

	return cbtr, nil, nil
}
