package authcontroller

import (
	"mm/src/dto"
	"mm/src/services"
	"mm/src/utils"

	"github.com/gofiber/fiber/v2"
)

type AuthController struct{}

func (AuthController) Register(c *fiber.Ctx) error {
	var req dto.RegisterRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(utils.JSONMessage("provide valid name, email and password"))
	}

	res, err := services.Auth.Register(req)

	if err != nil {
		return c.Status(400).Status(400).JSON(utils.JSONMessage(err.Error()))
	}

	return c.JSON(res)
}
