package usercontroller

import (
	"fmt"
	"mm/src/services"
	"mm/src/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (UserControllers) GetUserCurrentBalance(c *fiber.Ctx) error {

	uid := c.Locals("userID").(uuid.UUID)
	balance, err := services.User.GetUserCurrentBalance(uid)
	if err != nil {
		fmt.Println(err)
		return c.Status(400).JSON(utils.JSONMessage(err.Error()))
	}
	fmt.Println(balance)
	return c.Status(200).JSON(utils.JSONMessageStruct{
		"balance": balance,
	})
}
