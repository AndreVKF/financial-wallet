import styled from "styled-components"

export const SearchFormContainer = styled.form`
  width: 100%;
  display: flex;
  gap: 1.6rem;

  input {
    flex: 1;
    border-radius: 8px;
    border: 0;
    background-color: ${(props) => props.theme["gray-900"]};
    color: ${(props) => props.theme["gray-300"]};
    padding: 1.6rem;

    &::placeholder {
      color: ${(props) => props.theme["gray-500"]};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    border: 0;
    padding: 1.6rem;
    background: transparent;
    border: 1px solid ${(props) => props.theme["blue-300"]};
    color: ${(props) => props.theme["blue-300"]};

    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme["blue-500"]};
      border: 1px solid ${(props) => props.theme["blue-300"]};
      color: ${(props) => props.theme.white};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`
