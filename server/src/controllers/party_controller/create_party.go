package partycontroller

import (
	"mm/src/dto"
	"mm/src/services"
	"mm/src/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (PartyController) CreateParty(c *fiber.Ctx) error {
	uid := c.Locals("userID").(uuid.UUID)
	var party_info dto.CreatePartyRequest

	err := c.BodyParser(&party_info)

	if err != nil {
		return c.Status(400).JSON(utils.JSONMessage("provide party infomation to create"))
	}
	party, err := services.Party.CreateParty(uid, party_info)
	if err != nil {
		return c.Status(400).JSON(utils.JSONMessage("failed to create party"))
	}
	return c.Status(200).JSON(party)
}
