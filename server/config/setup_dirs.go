package config

import "os"

var DIR_LIST = []string{"public"}

func SetupDirs(dir_list []string) error {
	for _, dir_name := range dir_list {
		err := os.MkdirAll(dir_name, 0755)
		if err != nil {
			return err
		}
	}
	return nil
}
