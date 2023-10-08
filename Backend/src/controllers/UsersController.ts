import { PrismaClient, Users } from "@prisma/client"
import { ControllerInterface, ControllerProps } from "../interfaces/interfaces"
import { Request, Response } from "express"
import { hash } from "bcrypt"
import { ErrorHandler } from "../services/ErrorHandler"

type CreateUserBodyProps = {
  name: string
  email: string
  password: string
}

interface CreateUserBodyRequest extends Request {
  body: CreateUserBodyProps
}

export class UsersController implements ControllerInterface {
  dbEngine
  dbEngineTable

  constructor({ dbEngine }: ControllerProps) {
    this.dbEngine = dbEngine
    this.dbEngineTable = this.dbEngine.users
  }

  create = async (req: CreateUserBodyRequest, res: Response) => {
    let { name, email, password } = req.body

    if (!password || !email) {
      throw new ErrorHandler({
        message: "Email e/ou password são campos obrigatórios!!",
      })
    }

    name = name.toUpperCase()
    email = email.toLocaleLowerCase()

    // check if email is already registered
    const hasEmailBeenRegistered = await this.dbEngineTable.findUnique({
      where: {
        email,
      },
    })

    if (hasEmailBeenRegistered) {
      throw new ErrorHandler({
        message: "Já existe um usuário com esse email cadastrado!!",
      })
    }

    // hash password
    password = await hash(password, Number(process.env.BCRYPT_SALT))

    await this.dbEngineTable.create({
      data: {
        name,
        email,
        password,
      },
    })

    return res.status(201).json()
  }
}
