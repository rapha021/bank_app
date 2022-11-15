import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/appError"

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      code: err.statusCode,
      message: err.message,
    })
  }

  return res.status(500).json({
    status: "error",
    code: 500,
    message: "internal server error",
  })
}

export default errorMiddleware
