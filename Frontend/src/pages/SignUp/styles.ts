import styled from "styled-components"

export const SignInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rem;
  padding: 0 1.6rem;
  width: 100%;
`

export const FormContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
  gap: 2.4rem;

  label,
  input,
  button {
    font-size: 1.8rem;
  }
`

export const SignInForm = styled.form`
  width: 48rem;
  height: 66rem;

  border: 1px solid ${(props) => props.theme["gray-300"]};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2rem;

  padding: 3.2rem 0 1.6rem;

  background-color: ${(props) => props.theme["gray-700"]};

  h2 {
    align-self: center;
    font-size: 4.8rem;
  }

  button {
    align-self: center;
    margin-top: 2rem;
    width: 12rem;
    padding: 1.2rem;

    background: transparent;
    border: 1px solid ${(props) => props.theme["blue-300"]};
    color: ${(props) => props.theme["blue-300"]};

    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme["blue-500"]};
      color: ${(props) => props.theme.white};
      transition: background-color 0.2s;
    }
  }
`

export const SingInFormInputWrapper = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;

  gap: 1.6rem;
  position: relative;

  div {
    display: flex;
    align-items: center;

    input {
      flex: 1;
      border: 0;
      padding: 1.6rem;
      background-color: ${(props) => props.theme["gray-800"]};
      color: ${(props) => props.theme["gray-300"]};
      border-radius: 8px;

      &::placeholder {
        color: ${(props) => props.theme["gray-500"]};
      }
    }

    svg {
      position: absolute;
      right: 4rem;
      z-index: 99;
    }
  }
`

export const NewUserWrapper = styled.div`
  display: flex;
  gap: 0.8rem;

  a {
    text-decoration: None;
    color: ${(props) => props.theme["blue-300"]};

    &:hover {
      font-weight: bold;
      text-decoration: underline;
    }
  }
`
