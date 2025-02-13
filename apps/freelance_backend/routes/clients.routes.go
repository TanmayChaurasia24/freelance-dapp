package routes

import (
	controller "golang-freelance_backend/controllers"

	"net/http"
)

func ClientsRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/create", controller.GenerateClient)
}
