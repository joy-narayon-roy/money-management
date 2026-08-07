package types

import "errors"

type TransactionErrorType = error

var (
	TransactionInvalidType TransactionErrorType = errors.New("invalid transaction type")
)
