import { Router } from "express"
import { SessionsController } from "../controllers/SessionController"
import { PrismaClient } from "@prisma/client"
import { RouterInterface } from "../interfaces/interfaces"

export class SessionRoutes implements RouterInterface {
  router: Router
  controller: SessionsController

  constructor(dbEngine: PrismaClient) {
    this.controller = new SessionsController({ dbEngine })
    this.router = Router()

    this.setRouters()
  }

  setRouters = () => {
    this.router.post("/", this.controller.create)
    this.router.get("/", this.controller.validate)
  }
}
