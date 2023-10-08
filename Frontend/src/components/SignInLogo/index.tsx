import { LogoContainerWrapper } from "./styles"

import Logo from "../../assets/wallet.png"

export function SignInLogo() {
  return (
    <LogoContainerWrapper>
      <img src={Logo} />
      <h1>Fin Wallet</h1>
    </LogoContainerWrapper>
  )
}
