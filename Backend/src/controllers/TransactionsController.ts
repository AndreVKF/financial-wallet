import { Request, Response } from "express"
import {
  ControllerInterface,
  ControllerProps,
  RequestAuthenticated,
} from "../interfaces/interfaces"

import { z } from "zod"

const TransactionBodyPropsSchema = z.object({
  description: z.string().nonempty(),
  value: z.number(),
  category: z.string().nonempty(),
})

type CreateTransactionBodyProps = z.infer<typeof TransactionBodyPropsSchema>

interface CreateTransactionBodyRequest extends RequestAuthenticated {
  body: CreateTransactionBodyProps
}

export class TransactionsController implements ControllerInterface {
  dbEngine
  dbEngineTable

  constructor({ dbEngine }: ControllerProps) {
    this.dbEngine = dbEngine
    this.dbEngineTable = this.dbEngine.transactions
  }

  create = async (req: CreateTransactionBodyRequest | any, res: Response) => {
    let userId = req.user
    let { description, value, category } = TransactionBodyPropsSchema.parse(
      req.body
    )

    const transaction = await this.dbEngineTable.create({
      data: {
        description,
        value,
        category,
        id_user: userId,
      },
    })

    return res.json(transaction)
  }

  index = async (req: RequestAuthenticated | any, res: Response) => {
    let { page, query } = req.query
    let userId = req.user

    let skip
    if (!page) {
      skip = 0
    } else {
      skip = Number(page) * 10
    }

    const transactions = await this.dbEngineTable.findMany({
      where: {
        AND: [
          {
            id_user: userId,
          },
          {
            OR: [
              {
                description: {
                  contains: query,
                },
              },
              {
                category: {
                  contains: query,
                },
              },
            ],
          },
        ],
      },
      orderBy: {
        created_at: "desc",
      },
      skip,
      take: 10,
    })

    return res.json(transactions)
  }
}
