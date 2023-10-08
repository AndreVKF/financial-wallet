import { ZodError } from "zod"
import { ErrorHandler } from "../services/ErrorHandler"

import { ErrorRequestHandler, NextFunction, Request, Response } from "express"

export const errors = (
  err: ErrorRequestHandler | ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    res.status(err.statusCode).json({
      message: err.message,
    })

    return
  }
  if (err instanceof ZodError) {
    res.status(400).json({
      message: err.issues,
    })
  }

  console.log(err)

  res.status(500).json({
    status: "error",
    message: "Erro interno do servidor!!",
  })
}
