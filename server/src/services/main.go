package services

import (
	"mm/src/services/auth"
	"mm/src/services/party"
	"mm/src/services/transaction"
	"mm/src/services/user"
)

var (
	User        = user.UserServiceStruct{}
	Auth        = auth.AuthSerives{}
	Transaction = transaction.TransactionService{}
	Party       = party.PartyService{}
)
