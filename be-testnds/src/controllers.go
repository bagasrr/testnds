package src

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthInput struct {
    Username    string `json:"username" binding:"required"`
    Password string `json:"password" binding:"required"`
}
type UserResponse struct{
    ID uint `json:"id"`
    Username string `json:"username"`
}

func Register(c *gin.Context) {
    var input AuthInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Gagal membuat user", "error": err.Error()})
        return
    }

	if err := DB.Where("username = ?", input.Username).First(&User{}).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Username sudah digunakan"})
		return
	}

    hashedPassword, _ := HashPassword(input.Password)
    user := User{Username: input.Username, Password: hashedPassword}

    if result := DB.Create(&user); result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Gagal membuat user", "error": result.Error.Error()})
        return
    }
    userResponse := UserResponse{
        ID: user.ID,
        Username: user.Username,
    }

    c.JSON(http.StatusOK, gin.H{"message" : "User berhasil dibuat", "data": userResponse})
}

func Login(c *gin.Context) {
    var input AuthInput
    var user User

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Gagal login", "error": err.Error()})
        return
    }

    if err := DB.Where("username = ?", input.Username).First(&user).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"message": "Username atau password salah", "error": err.Error()})
        return
    }

    if !CheckPasswordHash(input.Password, user.Password) {
        c.JSON(http.StatusBadRequest, gin.H{"message": "username atau password salah"})
        return
    }

    token, err := GenerateToken(user.ID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Gagal generate token", "error": err.Error()})
        return
    }

    userResponse := UserResponse{
        ID: user.ID,
        Username: user.Username,
    }

    c.JSON(http.StatusOK, gin.H{
        "message":"Login berhasil",
        "user": userResponse,
        "token": token,
    })
}