import { Response, Request } from "express"
import {
  ControllerProps,
  SessionsInterface,
  UserIdJwtPayload,
} from "../interfaces/interfaces"
import { ErrorHandler } from "../services/ErrorHandler"
import { compare } from "bcrypt"
import { jwtConfig } from "../configs/jwt"
import { sign, verify } from "jsonwebtoken"

type CreateSessionBodyProps = {
  email: string
  password: string
}

interface CreateSessionBodyRequest extends Request {
  body: CreateSessionBodyProps
}

export class SessionsController implements SessionsInterface {
  dbEngine
  dbEngineTable

  constructor({ dbEngine }: ControllerProps) {
    this.dbEngine = dbEngine
    this.dbEngineTable = this.dbEngine.users
  }

  create = async (req: CreateSessionBodyRequest, res: Response) => {
    let { email, password } = req.body
    const user = await this.dbEngineTable.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new ErrorHandler({ message: "Email e/ou password incorretos!" })
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new ErrorHandler({ message: "Email e/ou password incorretos!" })
    }

    // create jwt
    const { secret, expiresIn } = jwtConfig
    const token = sign({ userId: user.id }, String(secret), { expiresIn })

    return res.json({
      userId: user.id,
      token,
    })
  }

  validate = async (req: Request, res: Response) => {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
      throw new ErrorHandler({ message: "Token não foi informado!!" })
    }

    const [, token] = authorizationHeader.split(" ")

    try {
      const { secret, expiresIn } = jwtConfig
      const { userId } = <UserIdJwtPayload>verify(token, String(secret))

      const user = await this.dbEngineTable.findUnique({
        where: {
          id: userId,
        },
      })

      if (!user) {
        throw new ErrorHandler({ message: "Usuário desconhecido!!" })
      }

      const newToken = sign({ userId: user.id }, String(secret), { expiresIn })

      return res.status(200).json({
        userId: userId,
        token: newToken,
      })
    } catch {
      throw new ErrorHandler({ message: "Token inválido!!" })
    }
  }
}
