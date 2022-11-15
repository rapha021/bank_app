import { Router } from "express"
import createUserController from "../controllers/user/createUser.controller"
import sessionUserController from "../controllers/user/sessionUser.controller"
import verifyBalanceController from "../controllers/user/verifyBalance.controller"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"

const router = Router()

export const userRoutes = () => {
  router.get("/balance", ensureAuthMiddleware, verifyBalanceController)

  router.post("/login", sessionUserController)
  router.post("/register", createUserController)

  return router
}
