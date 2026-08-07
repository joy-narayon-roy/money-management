package models

import (
	"fmt"

	"github.com/google/uuid"
)

type Party struct {
	BaseModel
	UserID uuid.UUID `gorm:"type:uuid;not null;uniqueIndex:idx_user_party_name" json:"user_id"`
	User   *User     `gorm:"foreignKey:UserID" json:"user,omitempty"`

	Name string `gorm:"size:255;not null;uniqueIndex:idx_user_party_name" json:"name"`

	Role PartyRole `gorm:"type:varchar(20);not null;index" json:"role"`

	Notes string `json:"notes,omitempty"`

	IsActive bool  `gorm:"default:true" json:"is_active"`
	Balance  int64 `gorm:"default:0" json:"balance"`

	Transactions *[]Transaction `gorm:"foreignKey:PartyID" json:"transactions,omitempty"`
}

func (Party) TableName() string {
	return "party"
}

func (p Party) String() string {
	return fmt.Sprintf(
		"Party(id='%s', name='%s', role='%s')",
		p.ID,
		p.Name,
		p.Role,
	)
}
