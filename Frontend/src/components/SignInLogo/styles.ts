import styled from "styled-components"

export const LogoContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  img {
    width: 8rem;
    height: 8rem;
    line-height: 0%;
    padding-bottom: 0.8rem;
  }

  h1 {
    color: ${(props) => props.theme["gray-100"]};
    font-size: 3.8rem;
    white-space: nowrap;
  }
`
