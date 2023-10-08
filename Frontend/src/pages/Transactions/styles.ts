import styled from "styled-components"

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 2.4rem 4rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 2rem 3.2rem;
    background-color: ${(props) => props.theme["gray-700"]};

    &:first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    &:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
`

interface PriceHighlightProps {
  variant: "income" | "outcome"
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === "income"
      ? props.theme["blue-300"]
      : props.theme["red-300"]};
`
