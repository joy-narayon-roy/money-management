package authcontroller

import (
	"mm/src/dto"
	"mm/src/services"
	"mm/src/utils"

	"github.com/gofiber/fiber/v2"
)

func (AuthController) Login(c *fiber.Ctx) error {

	var req dto.LoginRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(utils.JSONMessage("provide valid email and password for login"))
	}

	token, err := services.Auth.Login(req)

	if err != nil {
		return c.Status(400).JSON(utils.JSONMessage(err.Error()))
	}

	res := dto.LoginResponse{
		Token: token,
	}
	return c.Status(200).JSON(res)
}
