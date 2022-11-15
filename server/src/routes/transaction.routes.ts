import { Router } from "express"
import cashOutController from "../controllers/transaction/cashOut.controller"
import getAllTransactionController from "../controllers/transaction/getAllTransactions.controller"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"

const router = Router()

export const transactionRoutes = () => {
  router.post("/cashout", ensureAuthMiddleware, cashOutController)

  router.get("/", ensureAuthMiddleware, getAllTransactionController)

  return router
}
