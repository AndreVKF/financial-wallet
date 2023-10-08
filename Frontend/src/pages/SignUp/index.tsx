import {
  SignInContainer,
  SignInForm,
  SingInFormInputWrapper,
  NewUserWrapper,
  FormContainerWrapper,
} from "./styles"

import { SignInLogo } from "../../components/SignInLogo"

import { Link, useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Eye, EyeClosed } from "phosphor-react"
import { useContext, useState } from "react"
import { api } from "../../lib/axios"
import { ROUTES } from "../../common/constants"
import { toast } from "react-toastify"
import { AuthorizationContext } from "../../contexts/AuthorizationContext"
import { AxiosError } from "axios"

const loginFormSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
  password_confirm: z.string(),
})

type LoginFormInputs = z.infer<typeof loginFormSchema>

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const { loginUser } = useContext(AuthorizationContext)
  const navigate = useNavigate()

  const { register, handleSubmit, reset } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  })

  function handleRegister(data: LoginFormInputs) {
    const { name, email, password, password_confirm } = data

    if (password !== password_confirm) {
      toast.error("Passwords não batem!!")
      return
    }

    api
      .post(ROUTES.USER, {
        name,
        email,
        password,
      })
      .then(() => {
        loginUser({ email, password })
        navigate("/")
      })
      .catch((err: AxiosError | any) => {
        if (err.response) {
          toast.error(err.response.data.message)
        } else {
          toast.error("Não foi possível realizar o login!!")
        }
      })

    reset()
  }

  return (
    <SignInContainer>
      <SignInLogo />

      <FormContainerWrapper>
        <SignInForm onSubmit={handleSubmit(handleRegister)}>
          <h2>Register</h2>

          <SingInFormInputWrapper>
            <label htmlFor="name">nome</label>
            <div>
              <input
                type="text"
                id="name"
                placeholder="digite seu nome"
                {...register("name")}
              />
            </div>
          </SingInFormInputWrapper>

          <SingInFormInputWrapper>
            <label htmlFor="email">email</label>
            <div>
              <input
                type="email"
                id="email"
                placeholder="email@email.com"
                {...register("email")}
              />
            </div>
          </SingInFormInputWrapper>

          <SingInFormInputWrapper>
            <label htmlFor="password">password</label>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="password"
                {...register("password")}
              />
              {showPassword ? (
                <Eye size={24} onClick={() => setShowPassword(false)} />
              ) : (
                <EyeClosed size={24} onClick={() => setShowPassword(true)} />
              )}
            </div>
          </SingInFormInputWrapper>

          <SingInFormInputWrapper>
            <label htmlFor="password_confirm">confirmar password</label>
            <div>
              <input
                type={showPasswordConfirm ? "text" : "password"}
                id="password_confirm"
                placeholder="confirmar password"
                {...register("password_confirm")}
              />
              {showPasswordConfirm ? (
                <Eye size={24} onClick={() => setShowPasswordConfirm(false)} />
              ) : (
                <EyeClosed
                  size={24}
                  onClick={() => setShowPasswordConfirm(true)}
                />
              )}
            </div>
          </SingInFormInputWrapper>

          <button type="submit">Registrar</button>
        </SignInForm>

        <NewUserWrapper>
          <span>Já tem login ?</span>
          <Link to="/">Entrar na sua conta</Link>
        </NewUserWrapper>
      </FormContainerWrapper>
    </SignInContainer>
  )
}
