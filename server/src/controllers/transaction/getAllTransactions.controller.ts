import { Request, Response } from "express"
import getAllTransactionService from "../../services/transaction/getAllTransactions.service"

const getAllTransactionController = async (req: Request, res: Response) => {
  const { cashout, cashin } = req.query
  const userId = req.user.id

  const transactionsList = await getAllTransactionService(
    cashout,
    cashin,
    userId
  )

  return res.json(transactionsList)
}

export default getAllTransactionController
