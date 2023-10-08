import "express-async-errors"
import "dotenv/config"

import express, { Request, Response } from "express"
import cors from "cors"

import { routes } from "./routes"
import { errors } from "./middlewares/errors"

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)
app.use(errors)

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Fin-Wallet" })
})

app.listen(Number(process.env.SERVER_PORT), () => {
  console.log("Hello world!")
})
