import express from "express"
import "reflect-metadata"
import "express-async-errors"
import errorMiddleware from "./middlewares/error.middleware"
import { appRoutes } from "./routes"
import "dotenv/config"

const app = express()

app.use(express.json())

appRoutes(app)

app.use(errorMiddleware)

export default app
