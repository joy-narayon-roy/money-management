package controllers

import "github.com/gofiber/fiber/v2"

func PublicHandeller(ctx *fiber.Ctx) error {
	return ctx.Status(200).SendFile("./public/index.html")
}
