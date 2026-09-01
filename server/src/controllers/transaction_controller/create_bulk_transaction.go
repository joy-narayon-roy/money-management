package transactioncontroller

import (
	"mm/src/dto/dto_transaction"
	"mm/src/services"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type CreateBulkTransactionResponse struct {
	dto_transaction.CreateBulkTransactionResult
	Error string `json:"error"`
}

func (TransactionControllerStruct) CreateBulkTransaction(c *fiber.Ctx) error {
	uid := c.Locals("userID").(uuid.UUID)

	res := CreateBulkTransactionResponse{}

	req_info, validation_errs, err := dto_transaction.CreateBulkTransactionRequest.Parse(dto_transaction.CreateBulkTransactionRequest{}, c.BodyRaw())

	if err != nil || validation_errs != nil {
		if err != nil {
			res.Error = err.Error()
		}
		if validation_errs != nil {
			res.Errors = *validation_errs
		}
		return c.Status(400).JSON(res)
	}

	btr, err := services.Transaction.CreateBulk(uid, req_info)
	res.CreateBulkTransactionResult = btr
	if err != nil {
		res.Error = err.Error()
	}

	return c.Status(200).JSON(res)
}
