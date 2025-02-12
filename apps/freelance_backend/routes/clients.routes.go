package routes

import (
	controller "golang-freelance_backend/controllers"

	"github.com/gin-gonic/gin"
)

func ClientsRoutes(incommingRoutes *gin.Engine) {
	incommingRoutes.POST("/create", controller.GenerateClient())
}
