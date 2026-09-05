package party

import (
	"fmt"
	"mm/config"
	"mm/src/dto"
	"mm/src/models"
	"mm/src/utils"

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

func (PartyService) CreateParty(uid uuid.UUID, party_info dto.CreatePartyRequest) (*models.Party, *dto.PartyValidationError, error) {
	verr := dto.PartyValidationError{}

	role_ok := party_role_validity(string(party_info.Role))
	if !role_ok {
		verr.Role = utils.StrPtr(fmt.Sprintf("invalid role `%s`", party_info.Role))
	}
	if party_info.Name == "" {
		verr.Name = utils.StrPtr("name is required")
	}

	if verr.IsAnyError() {
		return nil, &verr, nil
	}

	party := models.Party{
		UserID:      uid,
		Name:        party_info.Name,
		Description: party_info.Description,
		Role:        party_info.Role,
	}

	err := config.DB.Save(&party).Error

	if err != nil {
		if err.Error() == gorm.ErrDuplicatedKey.Error() {
			verr.Name = utils.StrPtr(fmt.Sprintf("`%s` name alredy exists", party_info.Name))
			return nil, &verr, nil
		}
		return nil, nil, err
	}
	return &party, nil, nil
}
