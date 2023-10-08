import { Router } from "express"
import { TransactionsController } from "../controllers/TransactionsController"
import { PrismaClient } from "@prisma/client"
import { RouterInterface } from "../interfaces/interfaces"

export class TransactionRoutes implements RouterInterface {
  router
  controller

  constructor(dbEngine: PrismaClient) {
    this.controller = new TransactionsController({ dbEngine })
    this.router = Router()

    this.setRouters()
  }

  setRouters = () => {
    this.router.post("/", this.controller.create)
    this.router.get("/", this.controller.index)
  }
}
