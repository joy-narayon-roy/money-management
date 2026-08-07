package password

import "golang.org/x/crypto/bcrypt"

func New() Service {
	return newBcryptService(bcrypt.DefaultCost)
}

func NewWithCost(cost int) Service {
	return newBcryptService(cost)
}
