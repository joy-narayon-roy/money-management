package utils

type JSONMessageStruct map[string]interface{}

func JSONMessage(msg string) map[string]string {
	return map[string]string{
		"message": msg,
	}
}
