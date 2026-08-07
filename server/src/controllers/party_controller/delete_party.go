package partycontroller

import (
	"mm/src/utils"

	"github.com/gofiber/fiber/v2"
)

func (PartyController) DeleteParty(c *fiber.Ctx) error {
	return c.Status(200).JSON(utils.JSONMessage("Delete Party"))
}
