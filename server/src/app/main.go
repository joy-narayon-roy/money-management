package app

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

var APP *fiber.App = nil

func CreateAPP(config fiber.Config) *fiber.App {
	APP = fiber.New(config)

	APP.Use(logger.New())
	APP.Use(cors.New())
	APP.Static("/", "./public")

	return APP
}
