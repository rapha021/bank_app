import { AppDataSource } from "../../data-source"
import { Account } from "../../entities/accounts.entities"
import { Transaction } from "../../entities/transactions.entities"
import { User } from "../../entities/users.entities"
import { AppError } from "../../errors/appError"
import { ITransactionRequest } from "../../interfaces/transaction.interface"

const cashOutService = async (
  { username, value }: ITransactionRequest,
  id: string
) => {
  const usersRepository = AppDataSource.getRepository(User)
  const accountsRepository = AppDataSource.getRepository(Account)
  const transactionsRepository = AppDataSource.getRepository(Transaction)

  const userCashOut = await usersRepository.findOneBy({ id })
  const userCashIn = await usersRepository.findOneBy({ userName: username })

  const accountCashOut = await accountsRepository.findOneBy({
    id: userCashOut?.account.id,
  })

  const accountCashIn = await accountsRepository.findOneBy({
    id: userCashIn?.account.id,
  })

  if (!userCashIn) {
    throw new AppError(404, "username not found")
  }

  if (userCashOut!.id === userCashIn!.id) {
    throw new AppError(401, "You cant send money to yourself")
  }

  if (accountCashOut!.balance < value) {
    throw new AppError(401, "Insuficient balance")
  }

  accountsRepository.update(accountCashOut!.id, {
    balance: accountCashOut!.balance - value,
  })

  accountsRepository.update(accountCashIn!.id, {
    balance: accountCashIn!.balance + value,
  })

  transactionsRepository.save({
    debitedAccountId: accountCashOut!,
    creditedAccountId: accountCashIn!,
    value: value,
  })

  return {
    message: `You send R$${value.toFixed(2)} to ${userCashIn!.userName}`,
  }
}

export default cashOutService
