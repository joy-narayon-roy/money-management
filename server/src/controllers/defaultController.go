package controllers

import (
	authcontroller "mm/src/controllers/auth_controller"
	partycontroller "mm/src/controllers/party_controller"
	transactioncontroller "mm/src/controllers/transaction_controller"
	usercontroller "mm/src/controllers/user_controller"
	"mm/src/models"

	"github.com/gofiber/fiber/v2"
)

var (
	User        = usercontroller.UserControllers{}
	Auth        = authcontroller.AuthController{}
	Transaction = transactioncontroller.TransactionControllerStruct{}
	Party       = partycontroller.PartyController{}
)

// Default Handeller godoc
//
//	@Summary		For testing purpose
//	@Description	Returns
//	@Tags			Test
//	@Produce		json
//	@Success		200
//	@Router			/ [get]

func DefaultHandeller(ctx *fiber.Ctx) error {
	return ctx.Status(200).JSON(fiber.Map{
		"message": "This is default controller",
	})
}

func HelthController(ctx *fiber.Ctx) error {
	return ctx.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "Server is running",
	})
}

func GetOptionsController(c *fiber.Ctx) error {
	options := fiber.Map{
		"transactions": models.TransactionTypes,
		"party_roles":  models.PartyRoles,
	}
	return c.Status(200).JSON(options)
}
