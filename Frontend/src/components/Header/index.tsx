import { Door } from "phosphor-react"

import {
  HeaderContainer,
  HeaderContent,
  NewTransactionButton,
  LogOutContainer,
} from "./styles"
import * as Dialog from "@radix-ui/react-dialog"

import { NewTransactionModal } from "../NewTransactionModal"

import Logo from "../../assets/wallet.png"
import { useContext } from "react"
import { AuthorizationContext } from "../../contexts/AuthorizationContext"

export function Header() {
  const { removeAuthorizationProtocol } = useContext(AuthorizationContext)

  return (
    <HeaderContainer>
      <HeaderContent>
        <div>
          <img src={Logo} alt="" />
          <h1>Fin Wallet</h1>
        </div>
        <div>
          <Dialog.Root>
            {/* Use styled button as child */}
            <Dialog.Trigger asChild>
              <NewTransactionButton>Nova Transação</NewTransactionButton>
            </Dialog.Trigger>

            <NewTransactionModal />
          </Dialog.Root>

          <LogOutContainer onClick={removeAuthorizationProtocol}>
            <Door size={32} />
            <span>Logout</span>
          </LogOutContainer>
        </div>
      </HeaderContent>
    </HeaderContainer>
  )
}
