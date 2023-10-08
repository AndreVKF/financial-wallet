import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react"
import { SummaryContainer, SummaryCard } from "./styles"

import { defaultTheme } from "../../styles/themes/default"

import { priceFormatter } from "../../utils/formatter"
import { TransactionsContext } from "../../contexts/TransactionsContext"
import { useContextSelector } from "use-context-selector"

export function Summary() {
  const transactionsSummary = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.transactionsSummary
    }
  )

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={40} color={defaultTheme["blue-500"]} />
        </header>
        <strong>
          {transactionsSummary?.totalDeposits &&
            priceFormatter.format(transactionsSummary.totalDeposits / 100)}
        </strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={40} color={defaultTheme["red-500"]} />
        </header>
        <strong>
          {transactionsSummary?.totalExpenditure &&
            priceFormatter.format(transactionsSummary.totalExpenditure / 100)}
        </strong>
      </SummaryCard>

      <SummaryCard variant="total">
        <header>
          <span>Total</span>
          <CurrencyDollar size={40} color={defaultTheme["white"]} />
        </header>
        <strong>
          {transactionsSummary?.total &&
            priceFormatter.format(transactionsSummary.total / 100)}
        </strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
