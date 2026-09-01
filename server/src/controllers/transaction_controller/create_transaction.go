package transactioncontroller

import (
	"mm/src/dto/dto_transaction"
	"mm/src/models"
	"mm/src/services"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type CreateTransactionResponse struct {
	Transaction     *models.Transaction                         `json:"transaction"`
	ValidationError *dto_transaction.TransactionValidationError `json:"validation_error"`
	Error           string                                      `json:"error"`
}

func (TransactionControllerStruct) CreateTransaction(c *fiber.Ctx) error {
	uid := c.Locals("userID").(uuid.UUID)

	res := CreateTransactionResponse{}

	req_info, validation_err, err := dto_transaction.CreateTransactionRequest.Parse(dto_transaction.CreateTransactionRequest{}, c.BodyRaw())

	if err != nil || validation_err != nil {
		if err != nil {
			res.Error = err.Error()
		}
		res.ValidationError = validation_err
		return c.Status(400).JSON(res)
	}

	result, validation_err, err := services.Transaction.Create(uid, req_info)

	if err != nil || validation_err != nil {
		if err != nil {
			res.Error = err.Error()
		}
		res.ValidationError = validation_err
		return c.Status(400).JSON(res)
	}

	res.Transaction = result

	return c.Status(200).JSON(res)
}
