package user

import (
	"errors"
	"mm/config"
	"mm/src/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UpdateUserInfo struct {
	Name     *string `json:"name"`
	Email    *string `json:"email"`
	Password *string `json:"password"`
}

func (u *UpdateUserInfo) Validate() (bool, string) {
	if u.Name == nil && u.Email == nil && u.Password == nil {
		return false, "provide info to update"
	}
	return true, ""
}

func (UserServiceStruct) UpdateUser(id uuid.UUID, info UpdateUserInfo) (*models.User, error) {
	if id == uuid.Nil {
		return nil, errors.New("invalid uuid. failed to update")
	}

	ok, msg := info.Validate()
	if !ok {
		return nil, errors.New(msg)
	}

	var user models.User
	err := config.DB.Model(&models.User{}).Where("id = ?", id).Find(&user).Error
	if err != nil {
		if err.Error() == gorm.ErrRecordNotFound.Error() {
			return nil, errors.New("invalid uuid. failed to update")
		}
		return nil, errors.New("failed to find user")
	}

	if info.Name != nil && (*info.Name) != user.Name {
		user.Name = *info.Name
	}
	if info.Email != nil && (*info.Email) != user.Email {
		user.Email = *info.Email
	}
	if info.Password != nil {
		user.Password = *info.Password
	}

	err = config.DB.Save(&user).Error
	if err != nil {
		return nil, errors.New("failed to update")
	}
	return &user, nil
}
