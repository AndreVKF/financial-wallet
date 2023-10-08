import { createBrowserRouter } from "react-router-dom"
import { SignIn } from "../pages/SignIn"
import { SignUp } from "../pages/SignUp"
import { NotFound } from "../pages/NotFound"

export const authorizationRouter = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
])
