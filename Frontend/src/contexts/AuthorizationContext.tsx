import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react"
import { api } from "../lib/axios"
import { ROUTES } from "../common/constants"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"

interface SetAuthorization {
  userId: string
  token: string
}

interface AuthorizationContext {
  userId: string
  loginUser: (data: UserLoginProps) => void
  removeAuthorizationProtocol: () => void
}

interface AuthorizationProviderProps {
  children: ReactNode
}

interface UserLoginProps {
  email: string
  password: string
}

export const AuthorizationContext = createContext({} as AuthorizationContext)

export function AuthorizationProvider({
  children,
}: AuthorizationProviderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userId, setUserId] = useState("")

  const setTokenIntoLocalStorage = (token: string) => {
    localStorage.setItem("@fin-wallet", token)
  }

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("@fin-wallet")
  }

  const setAuthorizationHeaders = (token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }

  const removeAuthorizationHeaders = () => {
    try {
      delete api.defaults.headers.common["Authorization"]
    } catch {
      /* empty */
    }
  }

  const setAuthorizationProtocol = useCallback(
    ({ userId, token }: SetAuthorization) => {
      setUserId(userId)
      setTokenIntoLocalStorage(token)
      setAuthorizationHeaders(token)
    },
    []
  )

  const removeAuthorizationProtocol = useCallback(() => {
    setUserId("")
    removeTokenFromLocalStorage()
    removeAuthorizationHeaders()
  }, [])

  const loginUser = ({ email, password }: UserLoginProps) => {
    api
      .post(ROUTES.LOGIN, { email, password })
      .then((resp: AxiosResponse) => {
        const { userId, token } = resp.data

        setAuthorizationProtocol({ userId, token })
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: AxiosError | any) => {
        if (err.response) {
          toast.error(err.response.data.message)
        } else {
          toast.error("Não foi possível realizar o login!!")
        }
      })
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("@fin-wallet")

    if (!storedToken) {
      return
    }
    setAuthorizationHeaders(storedToken)

    api
      .get(ROUTES.LOGIN)
      .then((resp: AxiosResponse) => {
        const { userId, token } = resp.data

        setAuthorizationProtocol({ userId, token })
      })
      .catch(() => {
        removeAuthorizationProtocol()
      })
  }, [setAuthorizationProtocol, removeAuthorizationProtocol])

  return (
    <AuthorizationContext.Provider
      value={{ userId, loginUser, removeAuthorizationProtocol }}
    >
      {children}
    </AuthorizationContext.Provider>
  )
}
