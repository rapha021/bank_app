import { AppDataSource } from "../../data-source"
import { Transaction } from "../../entities/transactions.entities"
import { User } from "../../entities/users.entities"
import { AppError } from "../../errors/appError"

const getAllTransactionService = async (
  cashout: any,
  cashin: any,
  userId: string
) => {
  const transactionRepository = AppDataSource.getRepository(Transaction)
  const usersRepository = AppDataSource.getRepository(User)

  let allTransactions = []

  const getLoggedUser = await usersRepository.findOneBy({ id: userId })
  const getAllUser = await usersRepository.find()

  const getCashOutTransactions = await transactionRepository.find({
    where: {
      debitedAccountId: getLoggedUser!.account,
    },
    relations: {
      debitedAccountId: true,
      creditedAccountId: true,
    },
  })

  const getCashInTransactions = await transactionRepository.find({
    where: {
      creditedAccountId: getLoggedUser!.account,
    },
    relations: {
      creditedAccountId: true,
      debitedAccountId: true,
    },
  })

  const cashOutTransactions = getCashOutTransactions.map((transaction) => {
    const receiverUser = getAllUser.filter(
      (user) => user.account.id === transaction.creditedAccountId.id
    )

    return {
      id: transaction.id,
      value: transaction.value,
      createdAt: transaction.createdAt,
      account: { username: receiverUser[0].userName },
      type: "cashOut",
    }
  })

  const cashInTransactions = getCashInTransactions.map((transaction) => {
    const receivedFromUser = getAllUser.filter(
      (user) => user.account.id === transaction.debitedAccountId.id
    )

    return {
      id: transaction.id,
      value: transaction.value,
      createdAt: transaction.createdAt,
      account: { username: receivedFromUser[0].userName },
      type: "cashIn",
    }
  })

  getCashOutTransactions.length > 0 &&
    allTransactions.push(...cashOutTransactions)

  getCashInTransactions.length > 0 &&
    allTransactions.push(...cashInTransactions)

  if (cashout === "true" && cashin === "true") {
    if (allTransactions.length < 1) {
      throw new AppError(404, "transactions not found")
    }

    return allTransactions
  } else if (cashout === "true") {
    if (getCashOutTransactions.length < 1) {
      throw new AppError(404, "transactions not found")
    }

    return { transferred: cashOutTransactions }
  } else if (cashin === "true") {
    if (getCashInTransactions.length < 1) {
      throw new AppError(404, "transactions not found")
    }

    return { received: cashInTransactions }
  }

  return allTransactions
}

export default getAllTransactionService
