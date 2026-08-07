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

func (UserServiceStruct) GetUserByID(id string) (*models.User, error) {
	var users models.User

	err := config.DB.
		Preload("Parties").
		Preload("TransactionTemplates").
		First(&users, "id = ?", id).Error

	if err != nil {
		return nil, err
	}
	return &users, nil
}
