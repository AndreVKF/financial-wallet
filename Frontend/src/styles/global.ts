import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme["blue-500"]};
  }

  :root {
    font-size: 62.5%;
  }

  body {
    background-color: ${(props) => props.theme["gray-800"]};
    color: ${(props) => props.theme["gray-100"]};
    -webkit-font-smoothing: antialiased;
  }

  body, input-security, textarea, button {
    font: 400 1.6rem Roboto, sans-serif;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${(props) => props.theme["gray-300"]};
    -webkit-box-shadow: 0 0 0 30px ${(props) =>
      props.theme["gray-900"]} inset !important;
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: inset 0 0 20px 20px ${(props) => props.theme["gray-900"]};
}

`
