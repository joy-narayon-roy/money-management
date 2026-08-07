package transactioncontroller

import (
	"mm/src/dto"
	"mm/src/services"
	"mm/src/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (TransactionControllerStruct) CreateTransaction(c *fiber.Ctx) error {

	uid := c.Locals("userID").(uuid.UUID)
	var info dto.CreateTransactionRequest
	err := c.BodyParser(&info)
	if err != nil {
		return c.Status(400).JSON(utils.JSONMessage(err.Error()))
	}
	tr, err := services.Transaction.Create(uid, info)
	if err != nil {
		return c.Status(200).JSON(utils.JSONMessage(err.Error()))
	}
	return c.Status(200).JSON(tr)
}
