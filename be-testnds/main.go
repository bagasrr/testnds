package main

import (
	"testnds/src"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func main() {
	src.ConnectDatabase()
	r := gin.Default()
	
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"POST"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/register", src.Register)
    r.POST("/login", src.Login)

	r.Run(":8080")
}