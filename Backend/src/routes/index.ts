import { Router } from "express"
import { PrismaEngine } from "../services/PrismaEngine"

import { authentication } from "../middlewares/authentication"

import { UserRoutes } from "./users.routes"
import { SessionRoutes } from "./sessions.routes"
import { TransactionRoutes } from "./transactions.routes"
import { SummaryRoutes } from "./summary.routes"

export const routes = Router()

const prismaEngine = PrismaEngine.getInstance()

const userRoutes = new UserRoutes(prismaEngine)
const sessionRoutes = new SessionRoutes(prismaEngine)
const transactionRoutes = new TransactionRoutes(prismaEngine)
const summaryRoutes = new SummaryRoutes(prismaEngine)

routes.use("/users", userRoutes.router)
routes.use("/session", sessionRoutes.router)
routes.use("/transaction", authentication, transactionRoutes.router)
routes.use("/summary", authentication, summaryRoutes.router)
