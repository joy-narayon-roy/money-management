package party

import (
	"fmt"
	"mm/config"
	"mm/src/dto"
	"mm/src/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func (PartyService) UpdateParties(id uuid.UUID, uid uuid.UUID, info dto.UpdatePartyRequest) (*models.Party, error) {

	var party models.Party
	err := config.DB.Where("id = ? and user_id = ?", id, uid).First(&party).Error
	if err != nil {
		if err.Error() == gorm.ErrRecordNotFound.Error() {
			return nil, fmt.Errorf("party not found")
		}
		return nil, fmt.Errorf("failed to update")
	}

	need_to_save := false

	if info.Name != "" && info.Name != party.Name {
		party.Name = info.Name
		need_to_save = true
	}

	if info.IsActive != nil && party.IsActive != *info.IsActive {

		party.IsActive = *info.IsActive
		need_to_save = true

	}

	if !need_to_save {
		return &party, nil
	}

	err = config.DB.Save(&party).Error

	if err != nil {
		if err.Error() == gorm.ErrDuplicatedKey.Error() {
			return nil, fmt.Errorf("party name alredy exists")
		}
		return nil, fmt.Errorf("failed to update")
	}
	return &party, nil
}
