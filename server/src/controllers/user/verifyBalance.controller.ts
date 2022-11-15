import { Request, Response } from "express"
import verifyBalanceService from "../../services/user/verifyBalance.service"
import { instanceToPlain } from "class-transformer"

const verifyBalanceController = async (req: Request, res: Response) => {
  const id = req.user.id

  const balance = await verifyBalanceService(id)

  return res.status(200).json(instanceToPlain(balance))
}

export default verifyBalanceController
