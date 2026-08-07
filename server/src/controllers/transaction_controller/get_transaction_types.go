package transactioncontroller

import (
	"mm/src/models"

	"github.com/gofiber/fiber/v2"
)

func (TransactionControllerStruct) GetTransactionTypes(c *fiber.Ctx) error {
	return c.Status(200).JSON(models.TransactionTypes)
}
