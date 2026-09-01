package routes

import (
	"mm/src/controllers"
	"mm/src/middleware"

	"github.com/gofiber/fiber/v2"
)

func useUserRoutes(route fiber.Router) {
	user_route := route.Group("user", middleware.JWTMiddleware)
	user_route.Get("/", controllers.User.GetUser)
	user_route.Get("/balance", controllers.User.GetUserCurrentBalance)
	user_route.Get("/summary", controllers.User.GetTransactionsummary)
	// user_route.Get("/transactions", controllers.User.GetTransactions)
}
