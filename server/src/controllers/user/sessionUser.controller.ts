import { Request, Response } from "express"
import sessionUserService from "../../services/user/sessionUser.service"

const sessionUserController = async (req: Request, res: Response) => {
  const userData = req.body

  const sessionUser = await sessionUserService(userData)

  return res.json({ token: sessionUser })
}

export default sessionUserController
