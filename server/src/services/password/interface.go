package password

type Service interface {
	Hash(password string) (string, error)
	Compare(hashedPassword, password string) error
}
