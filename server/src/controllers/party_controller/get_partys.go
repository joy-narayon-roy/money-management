package partycontroller

import (
	"mm/src/services"
	"mm/src/services/party"
	"mm/src/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (PartyController) GetParties(c *fiber.Ctx) error {
	uid := c.Locals("userID").(uuid.UUID)

	var opt party.GetPartiesOptions
	c.QueryParser(&opt)
	perties, err := services.Party.GetParties(uid, opt)
	if err != nil {
		return c.Status(500).JSON(utils.JSONMessage("something wrong"))
	}
	return c.Status(200).JSON(perties)
}
