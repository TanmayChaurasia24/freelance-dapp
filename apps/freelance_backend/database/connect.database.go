package database

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var ClientCollection *mongo.Collection

func ConnectDB() {
	MongoURI := os.Getenv("MONGO_URI")

	clientOptions := options.Client().ApplyURI(MongoURI)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	ClientCollection = client.Database("freelanceDB").Collection("clients")
}
