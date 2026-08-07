package models

import (
	"fmt"

	"github.com/google/uuid"
)

type Profile struct {
	BaseModel

	UserID uuid.UUID `gorm:"type:uuid;not null;uniqueIndex" json:"user_id"`

	Name string `gorm:"size:255;not null" json:"name"`

	OpeningBalance int64 `gorm:"default:0" json:"opening_balance"`

	User *User `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;" json:"user,omitempty"`

	Parties              []Party               `gorm:"foreignKey:ProfileID" json:"parties,omitempty"`
	Transactions         []Transaction         `gorm:"foreignKey:ProfileID" json:"transactions,omitempty"`
	TransactionTemplates []TransactionTemplate `gorm:"foreignKey:ProfileID" json:"transaction_templates,omitempty"`
}

func (Profile) TableName() string {
	return "profile"
}

func (p *Profile) String() string {
	return fmt.Sprintf(
		"Profile(id='%s', user_id='%s', name='%s')",
		p.ID,
		p.UserID,
		p.Name,
	)
}
