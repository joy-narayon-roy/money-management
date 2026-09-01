package models

import (
	"fmt"
	"time"

	"github.com/google/uuid"
)

type Transaction struct {
	BaseModel
	UserID      uuid.UUID       `gorm:"type:uuid;not null;index" json:"user_id"`
	PartyID     uuid.UUID       `gorm:"type:uuid;not null;index" json:"party_id"`
	Type        TransactionType `gorm:"type:varchar(20);not null;index" json:"type"`
	Amount      int64           `gorm:"not null" json:"amount"`
	Description string          `gorm:"type:text" json:"description"`
	Date        time.Time       `gorm:"not null;index" json:"date"`
	Party       *Party          `gorm:"foreignKey:PartyID;constraint:OnDelete:RESTRICT;" json:"party,omitempty"`
	User        *User           `gorm:"foreignKey:UserID" json:"user,omitempty"`
}

func (Transaction) TableName() string {
	return "transaction"
}

func (t Transaction) String() string {
	return fmt.Sprintf(
		"Transaction(id='%s', type='%s', amount=%d)",
		t.ID,
		t.Type,
		t.Amount,
	)
}
