import { Request, Response } from "express"
import createUserService from "../../services/user/createUser.service"

const createUserController = async (req: Request, res: Response) => {
  const userData = req.body

  const createdUser = await createUserService(userData)

  return res.status(201).json({ message: "user created succeffuly" })
}

export default createUserController
