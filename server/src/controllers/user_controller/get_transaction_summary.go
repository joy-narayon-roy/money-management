package usercontroller

import (
	"mm/src/services"
	"mm/src/services/user"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (UserControllers) GetTransactionsummary(c *fiber.Ctx) error {
	uid := c.Locals("userID").(uuid.UUID)

	var opt user.GetTransactionSummaryOptions
	c.QueryParser(&opt)
	res, _ := services.User.GetTransactionSummary(&uid, &opt)

	return c.Status(200).JSON(res)
}
