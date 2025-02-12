package main

import (
	"golang-freelance_backend/database"
	"golang-freelance_backend/routes"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	database.ConnectDB()

	router := gin.New()
	router.Use(gin.Logger())

	routes.ClientsRoutes(router)

	router.Run(":" + port)
}
