import { Header } from "../../components/Header"
import { Summary } from "../../components/Summary"
import { SearchForm } from "../../components/SearchForm"
import { Pagination } from "../../components/Pagination"

import {
  TransactionsContainer,
  TransactionsTable,
  PriceHighlight,
} from "./styles"
import { TransactionsContext } from "../../contexts/TransactionsContext"
import { dateFormatter, priceFormatter } from "../../utils/formatter"
import { useContextSelector } from "use-context-selector"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export function Transactions() {
  const [pagination, setPagination] = useState(0)

  const {
    transactions,
    transactionsSummary,
    setIsLoadingTransactionData,
    fetchTransactions,
  } = useContextSelector(TransactionsContext, (context) => {
    const {
      transactions,
      transactionsSummary,
      setIsLoadingTransactionData,
      fetchTransactions,
    } = context

    return {
      transactions,
      transactionsSummary,
      setIsLoadingTransactionData,
      fetchTransactions,
    }
  })

  const totalTransactions = transactionsSummary?.countTransactions ?? 0
  const maxPagination = Math.floor(totalTransactions / 10)

  const resetPagination = () => {
    setPagination(0)
  }

  useEffect(() => {
    setIsLoadingTransactionData(true)

    fetchTransactions({ page: pagination })
      .then()
      .catch(() => toast.error("Não foi possível buscar dados de transações!!"))
      .finally(() => setIsLoadingTransactionData(false))
  }, [fetchTransactions, pagination, setIsLoadingTransactionData])

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm resetPagination={resetPagination} />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              const type = transaction.value >= 0 ? "income" : "outcome"

              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={type}>
                      {type === "outcome" && "- "}
                      {priceFormatter.format(transaction.value / 100)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.created_at))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          maxPagination={maxPagination}
        />
      </TransactionsContainer>
    </div>
  )
}
