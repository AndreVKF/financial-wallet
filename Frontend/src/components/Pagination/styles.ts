import styled from "styled-components"

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1.6rem;
  margin-top: 3.2rem;
`
interface PaginationWrapperProps {
  disabled?: boolean
}

export const PaginationWrapper = styled.div<PaginationWrapperProps>`
  line-height: 0;

  border: 1px solid
    ${(props) => (props.disabled ? "none" : props.theme["blue-500"])};
  border-radius: 8px;

  height: 4.8rem;
  width: 4.8rem;

  display: grid;
  place-items: center;

  cursor: ${(props) => !props.disabled && "pointer"};

  svg {
    line-height: 0;
  }

  span {
    font-size: 2rem;
  }

  &:hover {
    background-color: ${(props) => !props.disabled && props.theme["blue-500"]};
    color: ${(props) => !props.disabled && props.theme.white};

    transition: ${(props) =>
      !props.disabled && "background-color 0.2s, color 0.2s"};
  }
`
