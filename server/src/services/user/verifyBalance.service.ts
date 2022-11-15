import { AppDataSource } from "../../data-source"
import { Account } from "../../entities/accounts.entities"
import { User } from "../../entities/users.entities"

const verifyBalanceService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User)
  const accountsRepository = AppDataSource.getRepository(Account)

  const user = await userRepository.findOneBy({ id })

  const balance = await accountsRepository.findOneBy({ id: user?.account.id })

  return balance
}

export default verifyBalanceService
