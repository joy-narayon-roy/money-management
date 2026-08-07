package routes

import (
	"mm/src/controllers"
	"mm/src/middleware"

	"github.com/gofiber/fiber/v2"
)

// _routes
func useTransactionRoutes(route fiber.Router) {
	transaction_route := route.Group("transaction", middleware.JWTMiddleware)
	transaction_route.Get("/", controllers.Transaction.GetTransaction)
	transaction_route.Get("/types", controllers.Transaction.GetTransactionTypes)
	transaction_route.Post("/", controllers.Transaction.CreateTransaction)
}
