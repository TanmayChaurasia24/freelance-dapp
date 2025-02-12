package routes

import (
	"github.com/gin-gonic/gin"
)

func ClientsRoutes(incommingRoutes *gin.Engine) {
	incommingRoutes.POST("/create", controllers.generateClient())
}
