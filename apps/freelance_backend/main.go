package main

import (
	"fmt"
	"golang-freelance_backend/database"
	"golang-freelance_backend/routes"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	database.ConnectDB()

	mux := http.NewServeMux()

	routes.ClientsRoutes(mux)

	fmt.Println("🚀 Server is running on port:", port)
	err = http.ListenAndServe(":"+port, mux)
	if err != nil {
		log.Fatal("❌ Failed to start server:", err)
	}
}
