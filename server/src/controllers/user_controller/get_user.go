package usercontroller

import (
	"mm/src/services"
	"mm/src/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (UserControllers) GetUser(c *fiber.Ctx) error {
	var user_id uuid.UUID = c.Locals("userID").(uuid.UUID)

	user, err := services.User.GetUserByID(user_id.String())

	if err != nil {
		return c.Status(400).JSON(utils.JSONMessage("faild to get user info"))
	}
	return c.Status(200).JSON(user)
}
