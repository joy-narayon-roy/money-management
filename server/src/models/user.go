package models

import "fmt"

type User struct {
	BaseModel

	Name     string `gorm:"not null" json:"name"`
	Email    string `gorm:"not null;uniqueIndex" json:"email"`
	Password string `gorm:"not null" json:"-"`

	OpeningBalance int64 `gorm:"default:0" json:"opening_balance"`

	Parties              []Party               `gorm:"constraint:OnDelete:CASCADE;" json:"parties"`
	Transactions         []Transaction         `gorm:"constraint:OnDelete:CASCADE;" json:"transactions,omitempty"`
	TransactionTemplates []TransactionTemplate `gorm:"constraint:OnDelete:CASCADE;" json:"transaction_templates"`
}

func (User) TableName() string {
	return "user"
}

func (u User) String() string {
	return fmt.Sprintf(
		"User(id='%s', name='%s', email='%s')",
		u.ID,
		u.Name,
		u.Email,
	)
}
