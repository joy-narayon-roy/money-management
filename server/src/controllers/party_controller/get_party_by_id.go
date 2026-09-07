package partycontroller

import (
	"mm/src/services"
	"mm/src/services/party"
	"mm/src/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (PartyController) GetPartyById(c *fiber.Ctx) error {
	uid := c.Locals("userID").(uuid.UUID)
	pid_str := c.Params("id", uuid.NewString())
	pid, err := uuid.Parse(pid_str)
	if err != nil {
		return c.Status(400).JSON(utils.JSONMessage("invalid party id"))
	}

	var opt party.GetPartiesOptions
	c.QueryParser(&opt)
	perties, err := services.Party.GetPartyById(uid, pid, opt)
	if err != nil {
		return c.Status(500).JSON(utils.JSONMessage("something wrong"))
	}
	return c.Status(200).JSON(perties)
}
