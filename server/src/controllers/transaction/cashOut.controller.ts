import { Request, Response } from "express"
import cashOutService from "../../services/transaction/cashOut.service"

const cashOutController = async (req: Request, res: Response) => {
  const transactionData = req.body
  const id = req.user.id

  const cashOut = await cashOutService(transactionData, id)

  return res.status(201).json(cashOut)
}

export default cashOutController
