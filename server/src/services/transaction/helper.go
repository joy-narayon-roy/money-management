package transaction

// import (
// 	"encoding/json"
// 	"fmt"
// 	"mm/src/dto/dto_transaction"
// 	"mm/src/models"
// 	"time"

// 	"github.com/google/uuid"
// )

// func validate_transaction_type(st string) bool {
// 	if st == "" {
// 		return false
// 	}
// 	for _, t := range models.TransactionTypes {
// 		if st == string(t) {
// 			return true
// 		}
// 		continue
// 	}
// 	return false
// }

// func transaction_validator(info dto_transaction.CreateTransactionRequest) *TransactionValidationError {
// 	err := TransactionValidationError{}
// 	err_exists := false
// 	if !validate_transaction_type(string(info.Type)) {
// 		// fmt.Println()
// 		err_exists = true
// 		err.Type = "invalid transaction type debug"
// 	}
// 	if info.Amount <= 0 {
// 		err_exists = true
// 		err.Amount = "invalid amount"
// 	}
// 	if info.PartyID == uuid.Nil {
// 		err_exists = true
// 		err.PartyID = "invalid party_id"
// 	}
// 	if info.Date == nil {
// 		err_exists = true
// 		err.Date = "invalid date"
// 	}

// 	if err_exists {
// 		return &err
// 	}

// 	return nil
// }

// func bulk_transaction_validator(infos map[int]*dto_transaction.CreateTransactionRequest) (map[int]models.Transaction, map[int]*TransactionValidationError) {
// 	errors := map[int]*TransactionValidationError{}
// 	transactions := map[int]models.Transaction{}
// 	for i, info := range infos {
// 		if info == nil {
// 			continue
// 		}
// 		vr := transaction_validator(*info)
// 		if vr != nil {
// 			errors[i] = vr
// 		} else {
// 			date := time.Now()
// 			if info.Date != nil {
// 				parsedDate, err := time.Parse("2006-01-02", *info.Date)
// 				if err == nil {
// 					date = parsedDate
// 				}
// 			}

// 			tr := models.Transaction{
// 				Type:        info.Type,
// 				Amount:      int64(info.Amount),
// 				Description: info.Description,
// 				PartyID:     info.PartyID,
// 				Date:        date,
// 			}

// 			transactions[i] = tr
// 			errors[i] = nil
// 		}
// 	}

// 	return transactions, errors
// }

// func ParseBulkTransaction(jsonStr []byte) (map[int]*dto_transaction.CreateTransactionRequest, map[int]*TransactionValidationError, error) {
// 	infos := map[int]*dto_transaction.CreateTransactionRequest{}
// 	parse_errs := map[int]*TransactionValidationError{}

// 	var jsonDatas []map[string]any

// 	err := json.Unmarshal(jsonStr, &jsonDatas)
// 	if err != nil {
// 		return infos, parse_errs, fmt.Errorf("invalid json data")
// 	}

// 	for i, jd := range jsonDatas {
// 		info := dto_transaction.CreateTransactionRequest{}
// 		e := TransactionValidationError{}

// 		isAnyError := false

// 		// type
// 		trans_type, trans_type_ok := jd["type"].(string)
// 		if !trans_type_ok {
// 			isAnyError = true
// 			e.Type = "invalid type"
// 		} else {
// 			if trans_type == "INCOME" {
// 				info.Type = models.TransactionTypeIncome
// 			} else if trans_type == "EXPENSE" {
// 				info.Type = models.TransactionTypeExpense
// 			} else if trans_type == "AP" {
// 				info.Type = models.TransactionTypeAP
// 			} else if trans_type == "AP_PAYMENT" {
// 				info.Type = models.TransactionTypeAPPayment
// 			} else if trans_type == "AR" {
// 				info.Type = models.TransactionTypeAR
// 			} else if trans_type == "AR_PAYMENT" {
// 				info.Type = models.TransactionTypeARPayment
// 			} else {
// 				isAnyError = true
// 				e.Type = "invalid type"
// 			}
// 		}

// 		// amount
// 		amount, amount_ok := jd["amount"].(float64)
// 		if !amount_ok {
// 			isAnyError = true
// 			e.Amount = "invalid amount"
// 		} else {
// 			info.Amount = uint64(amount)
// 		}

// 		// date
// 		date, date_ok := jd["date"].(string)
// 		if !date_ok {
// 			isAnyError = true
// 			e.Date = "invalid date"
// 		} else {
// 			info.Date = &date
// 		}

// 		description, description_ok := jd["description"].(string)
// 		if !description_ok {
// 			isAnyError = true
// 			e.Description = "invalid description"
// 		} else {
// 			info.Description = description
// 		}

// 		// party_id
// 		party_str_id, party_id_str_ok := jd["party_id"].(string)
// 		if !party_id_str_ok {
// 			isAnyError = true
// 			e.PartyID = "invalid party id"
// 		} else {
// 			info.PartyID, _ = uuid.Parse(party_str_id)
// 		}

// 		if isAnyError {
// 			parse_errs[i] = &e
// 		} else {
// 			infos[i] = &info
// 			parse_errs[i] = nil
// 		}
// 	}

// 	// TODO: Validate here
// 	// for i, info := range infos {
// 	// 	vr := info.Validate()
// 	// 	if vr != nil {
// 	// 		infos[i] = nil
// 	// 		exists_err := parse_errs[i]
// 	// 		if exists_err != nil {
// 	// 			mar_err := TransactionValidationError.MargeError(TransactionValidationError{}, *exists_err, TransactionValidationError{})
// 	// 			parse_errs[i] = &mar_err
// 	// 		}
// 	// 		parse_errs[i] = (*TransactionValidationError)(vr)
// 	// 	}
// 	// }
// 	return infos, parse_errs, nil
// }
