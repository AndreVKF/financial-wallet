import { NotFound } from "../pages/NotFound"
import { Transactions } from "../pages/Transactions"
import { TransactionsProvider } from "../contexts/TransactionsContext"

import { createBrowserRouter } from "react-router-dom"

export const transactionsRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    ),
    errorElement: <NotFound />,
  },
])
