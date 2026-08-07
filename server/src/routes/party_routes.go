package routes

import (
	"mm/src/controllers"
	"mm/src/middleware"

	"github.com/gofiber/fiber/v2"
)

func usePartyRoutes(api fiber.Router) {
	parties := api.Group("/party", middleware.JWTMiddleware)
	parties.Get("/", controllers.Party.GetParties)
	parties.Post("/", controllers.Party.CreateParty)
	parties.Patch("/:id", controllers.Party.UpdateParty)
	parties.Delete("/:id", controllers.Party.DeleteParty)
}
