package dto_transaction

type TransactionValidationError struct {
	Type        *string `json:"type,omitempty"`
	PartyID     *string `json:"party_id,omitempty"`
	Amount      *string `json:"amount,omitempty"`
	Description *string `json:"description,omitempty"`
	Date        *string `json:"date,omitempty"`
}

func mergeStrPtr(curr, new *string) *string {
	if new == nil || *new == "" {
		return curr
	}
	if curr == nil || *curr == "" {
		v := *new
		return &v
	}
	merged := *curr + ", " + *new
	return &merged
}

func (curr *TransactionValidationError) MargeError(new TransactionValidationError) TransactionValidationError {
	if curr == nil {
		return new
	}

	curr.Type = mergeStrPtr(curr.Type, new.Type)
	curr.PartyID = mergeStrPtr(curr.PartyID, new.PartyID)
	curr.Amount = mergeStrPtr(curr.Amount, new.Amount)
	curr.Description = mergeStrPtr(curr.Description, new.Description)
	curr.Date = mergeStrPtr(curr.Date, new.Date)

	return *curr
}

func (tve *TransactionValidationError) IsAnyError() bool {
	if tve == nil {
		return false
	}

	notEmpty := func(s *string) bool {
		return s != nil && *s != ""
	}

	return notEmpty(tve.Amount) || notEmpty(tve.Date) || notEmpty(tve.Description) ||
		notEmpty(tve.PartyID) || notEmpty(tve.Type)
}

type BulkTransactionValidationError map[int]*TransactionValidationError
