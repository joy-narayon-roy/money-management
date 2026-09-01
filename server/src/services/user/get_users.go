package user

import (
	"mm/config"
	"mm/src/models"
)

type GetUsersOptions struct{}

func (UserServiceStruct) GetUsers(opt GetUsersOptions) ([]models.User, error) {
	var users []models.User
	err := config.DB.Find(&users).Error
	if err != nil {
		return users, err
	}
	return users, nil
}

type UserResult struct {
	models.User
	Balance int64 `json:"balance"`
}

func (UserServiceStruct) GetUserByID(id string) (*UserResult, error) {
	var users UserResult

	err := config.DB.
		Preload("Parties").
		Preload("TransactionTemplates").
		First(&users.User, "id = ?", id).Error

	if err != nil {
		return nil, err
	}

	current_balance, err := UserServiceStruct.GetUserCurrentBalance(UserServiceStruct{}, users.ID)

	if err != nil {
		return nil, err
	}
	users.Balance = current_balance.CurrentBalance

	return &users, nil
}
