import { Response } from "express"
import {
  ControllerInterface,
  ControllerProps,
  RequestAuthenticated,
} from "../interfaces/interfaces"

export class SummaryController implements ControllerInterface {
  dbEngine
  dbEngineTable

  constructor({ dbEngine }: ControllerProps) {
    this.dbEngine = dbEngine
    this.dbEngineTable = this.dbEngine.transactions
  }

  index = async (req: RequestAuthenticated | any, res: Response) => {
    let { query } = req.query
    let userId = req.user

    const totalDeposits = await this.dbEngineTable.aggregate({
      where: {
        AND: [
          {
            id_user: userId,
          },
          {
            value: {
              gt: 0,
            },
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
      _sum: {
        value: true,
      },
    })

    const totalExpenditure = await this.dbEngineTable.aggregate({
      where: {
        AND: [
          {
            id_user: userId,
          },
          {
            value: {
              lt: 0,
            },
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
      _sum: {
        value: true,
      },
    })

    const total = await this.dbEngineTable.aggregate({
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
      _sum: {
        value: true,
      },
      _count: {
        value: true,
      },
    })

    return res.json({
      totalDeposits: totalDeposits._sum.value ?? 0,
      totalExpenditure: totalExpenditure._sum.value ?? 0,
      total: total._sum.value ?? 0,
      countTransactions: total._count.value ?? 0,
    })
  }
}
