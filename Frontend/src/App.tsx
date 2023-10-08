import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"

import { AuthorizationProvider } from "./contexts/AuthorizationContext"

import { Router } from "./routes/Router"
import { Toast } from "./lib/toast"
import "react-toastify/dist/ReactToastify.css"

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <AuthorizationProvider>
        <Router />
        <Toast />
      </AuthorizationProvider>
    </ThemeProvider>
  )
}
