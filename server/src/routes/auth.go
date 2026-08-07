package routes

import (
	"mm/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func useAuthRoutes(api fiber.Router) {
	auth := api.Group("auth")
	auth.Post("/login", controllers.Auth.Login)
	auth.Post("/register", controllers.Auth.Register)
}
