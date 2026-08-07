package partycontroller

import (
	"mm/src/dto"
	"mm/src/services"
	"mm/src/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (PartyController) UpdateParty(c *fiber.Ctx) error {
	pid_str := c.Params("id", uuid.NewString())
	pid, err := uuid.Parse(pid_str)
	if err != nil {
		return c.Status(400).JSON(utils.JSONMessage("invalid party id"))
	}

	uid := c.Locals("userID").(uuid.UUID)

	var update_info dto.UpdatePartyRequest
	err = c.BodyParser(&update_info)
	if err != nil {
		return c.Status(400).JSON(utils.JSONMessage(err.Error()))
	}

	updated_party, err := services.Party.UpdateParties(pid, uid, update_info)
	if err != nil {
		return c.Status(400).JSON(utils.JSONMessage(err.Error()))
	}
	return c.Status(200).JSON(updated_party)
}
