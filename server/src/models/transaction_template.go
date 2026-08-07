package models

import (
	"fmt"

	"github.com/google/uuid"
)

type TransactionTemplate struct {
	BaseModel
	UserID uuid.UUID `gorm:"type:uuid;not null;index" json:"user_id"`
	User   User      `gorm:"foreignKey:UserID"`

	DefaultAmount int64 `gorm:"default:0" json:"default_amount"`

	Description string `gorm:"type:text" json:"description"`

	IsActive bool `gorm:"default:true;index" json:"is_active"`

	Name string `gorm:"size:255;not null" json:"name"`

	Type TransactionType `gorm:"type:varchar(20);not null;index" json:"type"`
}

func (TransactionTemplate) TableName() string {
	return "transaction_template"
}

func (t *TransactionTemplate) String() string {
	return fmt.Sprintf(
		"TransactionTemplate(id='%s', name='%s')",
		t.ID,
		t.Name,
	)
}
