package password

import "golang.org/x/crypto/bcrypt"

type bcryptService struct {
	cost int
}

func newBcryptService(cost int) Service {
	if cost == 0 {
		cost = bcrypt.DefaultCost
	}

	return &bcryptService{
		cost: cost,
	}
}

func (s *bcryptService) Hash(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword(
		[]byte(password),
		s.cost,
	)
	if err != nil {
		return "", err
	}

	return string(hash), nil
}

func (s *bcryptService) Compare(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword(
		[]byte(hashedPassword),
		[]byte(password),
	)
}
