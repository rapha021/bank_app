import { Express } from "express"
import { transactionRoutes } from "./transaction.routes"
import { userRoutes } from "./user.routes"

export const appRoutes = (app: Express) => {
  app.use("/user", userRoutes())
  app.use("/transactions", transactionRoutes())
}
