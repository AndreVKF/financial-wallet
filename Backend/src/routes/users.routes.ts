import { Router } from "express"
import { UsersController } from "../controllers/UsersController"
import { PrismaClient } from "@prisma/client"
import { RouterInterface } from "../interfaces/interfaces"

export class UserRoutes implements RouterInterface {
  router
  controller

  constructor(dbEngine: PrismaClient) {
    this.controller = new UsersController({ dbEngine })
    this.router = Router()

    this.setRouters()
  }

  setRouters = () => {
    this.router.post("/", this.controller.create)
  }
}
