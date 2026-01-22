package src

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// User Model structure
type User struct {
    gorm.Model
    Username    string `gorm:"unique"`
    Password string
}

func ConnectDatabase() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

    dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s", 
	os.Getenv("DB_HOST"), 
	os.Getenv("DB_USER"), 
	os.Getenv("DB_PASSWORD"), 
	os.Getenv("DB_NAME"), 
	os.Getenv("DB_PORT"),
	)
	var err error
    database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

    if err != nil {
        log.Fatalf("Gagal konek ke database, Err : %v", err)
    }

	log.Println("Database connected successfully")

    database.AutoMigrate(&User{})

	DB = database
}