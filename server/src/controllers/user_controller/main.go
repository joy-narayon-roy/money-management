package usercontroller

import "github.com/gofiber/fiber/v2"

type UserControllers struct{}

func (UserControllers) HelloUser(ctx *fiber.Ctx) error {
	return ctx.Status(200).JSON(map[string]string{
		"message": "this is user api",
	})
}
