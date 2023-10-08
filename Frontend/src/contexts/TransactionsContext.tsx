import {
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useContext,
  Dispatch,
  SetStateAction,
} from "react"
import { api } from "../lib/axios"
import { createContext } from "use-context-selector"
import { ROUTES } from "../common/constants"
import { AuthorizationContext } from "./AuthorizationContext"
import { toast } from "react-toastify"

interface Transactions {
  id: number
  description: string
  value: number
  category: string
  created_at: string
}

interface TransactionsSummary {
  totalDeposits: number
  totalExpenditure: number
  total: number
  countTransactions: number
}

interface TransactionsContextType {
  isLoadingTransactionData: boolean
  setIsLoadingTransactionData: Dispatch<SetStateAction<boolean>>
  transactions: Transactions[]
  transactionsSummary: TransactionsSummary | null
  fetchTransactions: ({ page, query }: FetchTransactionsInput) => Promise<void>
  setTransactionQuery: Dispatch<SetStateAction<string>>
  createTransaction: (data: CreateTransactionInput) => void
}

interface TransactionsProvider {
  children: ReactNode
}

interface CreateTransactionInput {
  description: string
  value: number
  category: string
  type: "income" | "outcome"
}

interface FetchTransactionsInput {
  page?: number
  query?: string
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProvider) {
  const [isLoadingTransactionData, setIsLoadingTransactionData] = useState(true)
  const [transactions, setTransactions] = useState<Transactions[]>([])
  const [transactionQuery, setTransactionQuery] = useState("")
  const [transactionsSummary, setTransactionsSummary] =
    useState<TransactionsSummary | null>(null)
  const { userId } = useContext(AuthorizationContext)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchTransactions = useCallback(
    async ({ page }: FetchTransactionsInput) => {
      const queryPage = page ?? 0

      const response = await api.get(ROUTES.TRANSACTIONS, {
        params: {
          page: queryPage,
          query: transactionQuery,
        },
      })
      const data = response.data

      setTransactions(data)
    },
    [transactionQuery]
  )

  const fetchTransactionSummary = useCallback(async () => {
    const response = await api.get(ROUTES.SUMMARY, {
      params: { query: transactionQuery },
    })
    const data = response.data

    setTransactionsSummary(data)
  }, [transactionQuery])

  const fetchTransactionData = useCallback(() => {
    setIsLoadingTransactionData(true)

    Promise.all([fetchTransactions({}), fetchTransactionSummary()])
      .then()
      .catch(() => {
        toast.error("Não foi possível coletar dados de transações!!")
      })
      .finally(() => setIsLoadingTransactionData(false))
  }, [fetchTransactions, fetchTransactionSummary])

  const createTransaction = useCallback(
    (data: CreateTransactionInput) => {
      const { description, value, category, type } = data

      let adjValue = value * 100
      if (type === "outcome") {
        adjValue = adjValue * -1
      }

      api
        .post(ROUTES.TRANSACTIONS, {
          description,
          value: adjValue,
          category,
          id_user: userId,
        })
        .then(() => {
          fetchTransactionData()
        })
        .catch(() => {
          toast.error("Não foi possível atualizar de transações!!")
        })
    },
    [userId, fetchTransactionData]
  )

  useEffect(() => {
    fetchTransactionData()
  }, [fetchTransactionData, transactionQuery])

  return (
    <TransactionsContext.Provider
      value={{
        isLoadingTransactionData,
        setIsLoadingTransactionData,
        transactions,
        transactionsSummary,
        fetchTransactions,
        createTransaction,
        setTransactionQuery,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
