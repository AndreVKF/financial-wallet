import { TransactionsContext } from "../contexts/TransactionsContext"
import { useContextSelector } from "use-context-selector"

import { useMemo } from "react"

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const summary = useMemo(
    () =>
      transactions.reduce(
        (acc, transaction) => {

          if (transaction.value >= 0) {
            acc.income += transaction.value
            acc.total += transaction.value
          } else {
            acc.outcome += transaction.value
            acc.total -= transaction.value
          }
          return acc
        },
        {
          income: 0,
          outcome: 0,
          total: 0,
        }
      ),
    [transactions]
  )

  return summary
}
