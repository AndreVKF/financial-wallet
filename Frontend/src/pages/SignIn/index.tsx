import {
  SignInContainer,
  SignInForm,
  SingInFormInputWrapper,
  NewUserWrapper,
  FormContainerWrapper,
} from "./styles"

import { SignInLogo } from "../../components/SignInLogo"

import { Link } from "react-router-dom"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Eye, EyeClosed } from "phosphor-react"
import { useContext, useState } from "react"
import { AuthorizationContext } from "../../contexts/AuthorizationContext"

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginFormInputs = z.infer<typeof loginFormSchema>

export function SignIn() {
  const { loginUser } = useContext(AuthorizationContext)

  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, reset } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  })

  function handlerLogin(data: LoginFormInputs) {
    loginUser(data)
    reset()
  }

  return (
    <SignInContainer>
      <SignInLogo />

      <FormContainerWrapper>
        <SignInForm onSubmit={handleSubmit(handlerLogin)}>
          <h2>Login</h2>

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

          <button type="submit">Entrar</button>
        </SignInForm>

        <NewUserWrapper>
          <span>Não tem login ?</span>
          <Link to="/register">Criar uma conta</Link>
        </NewUserWrapper>
      </FormContainerWrapper>
    </SignInContainer>
  )
}
