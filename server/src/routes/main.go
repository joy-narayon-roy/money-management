package routes

import (
	"mm/src/controllers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
)

func UseRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Get("/options", controllers.GetOptionsController)

	useAuthRoutes(api)
	useUserRoutes(api)
	useTransactionRoutes(api)
	usePartyRoutes(api)
	app.Get("/health", controllers.HelthController)
	app.Get("/", controllers.DefaultHandeller)
	app.Get("/swagger/*", swagger.HandlerDefault)
}
