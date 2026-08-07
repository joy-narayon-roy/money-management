package usercontroller

import (
	"mm/src/services"
	"mm/src/services/user"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (UserControllers) GetTransactions(c *fiber.Ctx) error {
	uid := c.Locals("userID").(uuid.UUID)

	var opt user.GetTransactionsOptions
	c.QueryParser(&opt)
	res, _ := services.User.GetTransactions(uid, opt)

	return c.Status(200).JSON(res)
}
