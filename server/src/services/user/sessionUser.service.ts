import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entities"
import { AppError } from "../../errors/appError"
import { IUserRequest } from "../../interfaces/user.interface"
import { compareSync } from "bcrypt"
import jwt from "jsonwebtoken"

const sessionUserService = async ({ username, password }: IUserRequest) => {
  const usersRepository = AppDataSource.getRepository(User)

  const findUser = await usersRepository.findOneBy({ userName: username })

  if (!findUser) {
    throw new AppError(404, "User or password incorrect")
  }

  const verifyPassword = compareSync(password, findUser.password)

  if (!verifyPassword) {
    throw new AppError(404, "User or password incorrect")
  }

  const token = jwt.sign(
    { id: findUser.id },
    process.env.SECRET_KEY as string,
    { expiresIn: "24h" }
  )

  return token
}

export default sessionUserService
