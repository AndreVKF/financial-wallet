import styled from "styled-components"

export const HeaderContainer = styled.header`
  width: 100%;
  background: ${(props) => props.theme["gray-900"]};
  padding: 4rem 0 12rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2.4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 2rem;

    img {
      width: 5.6rem;
      height: 5.6rem;
    }
  }
`

const ButtonContainer = styled.button`
  height: 50px;
  border: 0;
  font-weight: bold;
  padding: 0 1.8rem;
  border-radius: 8px;
  cursor: pointer;
`

export const NewTransactionButton = styled(ButtonContainer)`
  background-color: ${(props) => props.theme["blue-500"]};
  color: ${(props) => props.theme.white};

  &:hover {
    background-color: ${(props) => props.theme["blue-700"]};
    transition: background-color 0.2s;
  }
`

export const LogOutContainer = styled(ButtonContainer)`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  background-color: ${(props) => props.theme["red-500"]};
  color: ${(props) => props.theme["gray-100"]};

  svg {
    line-height: 0;
  }

  &:hover {
    background-color: ${(props) => props.theme["red-700"]};
    transition: background-color 0.2s;
  }
`
