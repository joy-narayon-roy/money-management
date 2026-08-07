package transactioncontroller

import (
	"mm/src/services"
	"mm/src/services/transaction"
	"mm/src/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func (TransactionControllerStruct) GetTransaction(c *fiber.Ctx) error {
	uid := c.Locals("userID").(uuid.UUID)
	var query transaction.TransactionQuery
	c.QueryParser(&query)
	trans, err := services.Transaction.GetTransactions(uid, query)
	if err != nil {
		return c.Status(400).JSON(utils.JSONMessage(err.Error()))
	}
	return c.Status(200).JSON(trans)
}
