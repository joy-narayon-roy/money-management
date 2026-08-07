package auth

import (
	"errors"

	"mm/config"
	"mm/src/dto"
	"mm/src/models"
	"mm/src/utils"

	"golang.org/x/crypto/bcrypt"
)

func (AuthSerives) Login(info dto.LoginRequest) (string, error) {

	var user models.User

	err := config.DB.
		Where("email = ?", info.Email).
		First(&user).Error

	if err != nil {
		return "", errors.New("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(info.Password),
	)

	if err != nil {
		return "", errors.New("invalid credentials")
	}

	token, err := utils.GenerateToken(user.ID)

	if err != nil {
		return "", err
	}

	return token, nil
}
