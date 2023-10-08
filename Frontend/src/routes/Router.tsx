import { useContext } from "react"
import { AuthorizationContext } from "../contexts/AuthorizationContext"

import { authorizationRouter } from "./Authorization.routes"
import { transactionsRouter } from "./Transactions.routes"
import { RouterProvider } from "react-router-dom"

export function Router() {
  const { userId } = useContext(AuthorizationContext)
  const router =
    userId && userId !== "" ? transactionsRouter : authorizationRouter

  return <RouterProvider router={router} />
}
