package main

import (
	"log"
	"os"

	"mm/config"
	_ "mm/docs"
	"mm/src/app"
	"mm/src/models"
	"mm/src/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

//	@title			Money Managment APP
//	@version		1.0
//	@description	Fiber REST API
//	@host			localhost:8080
//	@BasePath		/

func main() {
	godotenv.Load()
	config.SetupDirs(config.DIR_LIST)
	app.CreateAPP(fiber.Config{
		AppName: "Money Mannager",
	})
	// Middlewares

	// Routes
	routes.UseRoutes(app.APP)

	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "3000"
	}
	err := config.ConnectDB()
	if err != nil {
		log.Fatalf("Failed to connect DB.\n%v", err)
	}
	err = models.AutoMigrate(config.DB)
	if err != nil {
		log.Fatalf("Failed to AutoMigrate models.\n%v", err)
	}
	log.Printf("Server running on : http://localhost:%s", port)
	if err := app.APP.Listen(":" + port); err != nil {
		log.Fatal(err)
	}
}
