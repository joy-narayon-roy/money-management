package auth

import (
	"errors"
	"mm/config"
	"mm/src/dto"
	"mm/src/models"
	"mm/src/services/password"
	"mm/src/utils"
)

type AuthSerives struct{}

func (AuthSerives) Register(req dto.RegisterRequest) (*dto.RegisterResponse, error) {

	var count int64

	config.DB.
		Model(&models.User{}).
		Where("email = ?", req.Email).
		Count(&count)

	if count > 0 {
		return nil, errors.New("email already exists")
	}

	hashedPassword, err := password.New().Hash(req.Password)
	if err != nil {
		return nil, err
	}

	user := models.User{
		Name:           req.Name,
		Email:          req.Email,
		Password:       hashedPassword,
		OpeningBalance: int64(req.OpeningBalance),
	}

	if err := config.DB.Create(&user).Error; err != nil {
		return nil, err
	}

	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		return nil, err
	}

	return &dto.RegisterResponse{
		Token: token,
	}, nil
}
