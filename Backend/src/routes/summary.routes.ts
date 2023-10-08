import { Router } from "express"

import { PrismaClient } from "@prisma/client"
import { RouterInterface } from "../interfaces/interfaces"
import { SummaryController } from "../controllers/SummaryController"

export class SummaryRoutes implements RouterInterface {
  router
  controller

  constructor(dbEngine: PrismaClient) {
    this.controller = new SummaryController({ dbEngine })
    this.router = Router()

    this.setRouters()
  }

  setRouters = () => {
    this.router.get("/", this.controller.index)
  }
}
