import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entities"

const verifyBalanceService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({ id })

  return user
}

export default verifyBalanceService
