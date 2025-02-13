package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"golang-freelance_backend/database"
	"golang-freelance_backend/models"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return "", err
	}
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func GenerateClient(res http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodPost {
		http.Error(res, "Only POST method is allowed", http.StatusMethodNotAllowed)
		return
	}
	fmt.Println("inside..")
	var company models.Company

	err := json.NewDecoder(req.Body).Decode(&company)
	if err != nil {
		http.Error(res, "invalid request payload", http.StatusBadRequest)
		return
	}

	company.ID = primitive.NewObjectID()
	hashpass, err := HashPassword(company.Password)
	company.Password = hashpass

	fmt.Println(company)

	collection := database.GetCompanyCollection()
	savedcompany, err := collection.InsertOne(context.TODO(), company)
	if err != nil {
		http.Error(res, "failed to save company", http.StatusInternalServerError)
		return
	}

	// Now safe to write response
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(savedcompany)
}
