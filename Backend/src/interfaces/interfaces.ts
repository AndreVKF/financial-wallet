import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

import * as jwt from "jsonwebtoken"

type ControllerRequest = Request | RequestAuthenticated | any

export interface ControllerProps {
  dbEngine: PrismaClient
}

export interface ControllerInterface {
  index?: (req: ControllerRequest, res: Response) => Promise<Response>
  show?: (req: ControllerRequest, res: Response) => Promise<Response>
  create?: (req: ControllerRequest, res: Response) => Promise<Response>
  update?: (req: ControllerRequest, res: Response) => Promise<Response>
  delete?: (req: ControllerRequest, res: Response) => Promise<Response>
}

export interface SessionsInterface {
  create: (req: Request, res: Response) => Promise<Response>
  validate: (req: Request, res: Response) => Promise<Response>
}

export interface RouterInterface {
  setRouters: () => void
}

export interface UserIdJwtPayload extends jwt.JwtPayload {
  userId: string
}

export interface RequestAuthenticated extends Request {
  user: string
}
