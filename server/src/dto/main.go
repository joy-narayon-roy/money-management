package dto

import "mm/src/dto/dto_transaction"

// Convert model.user to UserResponse
// func toUserResponse(user *models.User) RegisterResponse  {
// 	return dto.UserResponse{
// 		ID:             user.ID,
// 		Name:           user.Name,
// 		Email:          user.Email,
// 		OpeningBalance: user.OpeningBalance,
// 	}
// }

var (
	Transaction = dto_transaction.Transaction{}
)
