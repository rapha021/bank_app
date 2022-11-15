import express from "express"
import { errorMiddleware } from "./middlewares/error.middleware"
import { appRoutes } from "./routes"
import "dotenv/config"

export const app = express()

app.use(express.json())

appRoutes(app)

app.use(errorMiddleware)
