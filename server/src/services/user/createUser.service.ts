import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entities"
import { AppError } from "../../errors/appError"
import { IUserRequest } from "../../interfaces/user.interface"
import { hashSync } from "bcrypt"
import { Account } from "../../entities/accounts.entities"

const createUserService = async ({
  username,
  password,
}: IUserRequest): Promise<void> => {
  const usersRepository = AppDataSource.getRepository(User)
  const accountsRepository = AppDataSource.getRepository(Account)

  if (username.length <= 3) {
    throw new AppError(411, "Username mus be at least 3 characters")
  }

  const findUser = await usersRepository.findOneBy({ userName: username })

  if (findUser) {
    throw new AppError(409, "Username already registred!")
  }

  if (password.length < 8) {
    throw new AppError(411, "Password must be at least 8 characters")
  }

  const hashedPassword = hashSync(password, 10)

  const createdAccount = await accountsRepository.save({})

  await usersRepository.save({
    userName: username,
    password: hashedPassword,
    account: createdAccount,
  })

  return
}

export default createUserService
