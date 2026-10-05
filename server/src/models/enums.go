package models

type TransactionType string

const (
	TransactionTypeIncome   TransactionType = "INCOME"
	TransactionTypeIncomeAR TransactionType = "INCOME_AR"
	TransactionTypeExpense  TransactionType = "EXPENSE"

	TransactionTypeAR        TransactionType = "AR"
	TransactionTypeARPayment TransactionType = "AR_PAYMENT"

	TransactionTypeAP        TransactionType = "AP"
	TransactionTypeAPPayment TransactionType = "AP_PAYMENT"
)

type PartyRole string

const (
	PartyRoleIncome    PartyRole = "INCOME"
	PartyRoleIncome_AR PartyRole = "INCOME_AR"
	PartyRoleExpense   PartyRole = "EXPENSE"

	PartyRoleAR PartyRole = "AR"
	PartyRoleAP PartyRole = "AP"
)

var (
	TransactionTypes = []TransactionType{
		TransactionTypeIncome,
		TransactionTypeIncomeAR,
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
