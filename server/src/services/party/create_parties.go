package party

import (
	"errors"
	"fmt"
	"mm/config"
	"mm/src/dto"
	"mm/src/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func party_role_validity(role string) bool {
	switch role {
	case string(models.PartyRoleIncome):
		return true
	case string(models.PartyRoleExpense):
		return true
	case string(models.PartyRoleAP):
		return true
	case string(models.PartyRoleAR):
		return true
	default:
		return false
	}
}

func (PartyService) CreateParty(uid uuid.UUID, party_info dto.CreatePartyRequest) (*models.Party, error) {
	if party_info.Role == "" {
		return nil, errors.New("provide valid role")
	}
	party := models.Party{
		UserID: uid,
		Name:   party_info.Name,
	}
	role_ok := party_role_validity(string(party_info.Role))
	if !role_ok {
		return nil, fmt.Errorf("invalid role `%s`", party_info.Role)
	}
	party.Role = party_info.Role

	err := config.DB.Save(&party).Error

	if err != nil {
		if err.Error() == gorm.ErrDuplicatedKey.Error() {
			return nil, fmt.Errorf("`%s` name alredy exists", party_info.Name)
		}
		return nil, err
	}
	return &party, nil
}
