package models

type TransactionType string

const (
	TransactionTypeIncome  TransactionType = "INCOME"
	TransactionTypeExpense TransactionType = "EXPENSE"

	TransactionTypeAR        TransactionType = "AR"
	TransactionTypeARPayment TransactionType = "AR_PAYMENT"

	TransactionTypeAP        TransactionType = "AP"
	TransactionTypeAPPayment TransactionType = "AP_PAYMENT"
)

type PartyRole string

const (
	PartyRoleIncome  PartyRole = "INCOME"
	PartyRoleExpense PartyRole = "EXPENSE"

	PartyRoleAR PartyRole = "AR"
	PartyRoleAP PartyRole = "AP"
)

var (
	TransactionTypes = []TransactionType{
		TransactionTypeIncome,
		TransactionTypeExpense,

		TransactionTypeAR,
		TransactionTypeARPayment,

		TransactionTypeAP,
		TransactionTypeAPPayment,
	}
	PartyRoles = []PartyRole{
		PartyRoleIncome,
		PartyRoleExpense,

		PartyRoleAR,
		PartyRoleAP,
	}
)
