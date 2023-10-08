import { SingInHeaderContainer, SignInBanner } from "./styles"

import Logo from "../../assets/wallet.png"

export function SignInHeader() {
  return (
    <SingInHeaderContainer>
      <SignInBanner>
        <img src={Logo} />
        <span>Fin Wallet</span>
      </SignInBanner>
    </SingInHeaderContainer>
  )
}
