import { NextFunction, Request, Response } from "express"
import { ErrorHandler } from "../services/ErrorHandler"
import { verify } from "jsonwebtoken"
import { jwtConfig } from "../configs/jwt"

import {
  RequestAuthenticated,
  UserIdJwtPayload,
} from "../interfaces/interfaces"

export const authentication = (
  req: RequestAuthenticated | any,
  res: Response,
  next: NextFunction
): void => {
  const authenticationHeader = req.headers.authorization

  if (!authenticationHeader) {
    throw new ErrorHandler({
      message: "Token não foi informado!!",
      statusCode: 401,
    })
  }

  const [, token] = authenticationHeader.split(" ")

  try {
    const { secret } = jwtConfig
    const { userId } = <UserIdJwtPayload>verify(token, String(secret))

    req.user = userId

    return next()
  } catch {
    throw new ErrorHandler({ message: "Token inválido", statusCode: 401 })
  }
}
