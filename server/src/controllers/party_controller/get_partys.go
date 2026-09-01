package partycontroller

import (
	"mm/src/services"
	"mm/src/services/party"
	"mm/src/utils"

	"github.com/gofiber/fiber/v2"
)

func (PartyController) GetParties(c *fiber.Ctx) error {
	var opt party.GetPartiesOptions
	c.QueryParser(&opt)
	perties, err := services.Party.GetParties(opt)
	if err != nil {
		return c.Status(500).JSON(utils.JSONMessage("something wrong"))
	}
	return c.Status(200).JSON(perties)
}
