import { MagnifyingGlass } from "phosphor-react"

import { SearchFormContainer } from "./styles"
import { useForm } from "react-hook-form"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { TransactionsContext } from "../../contexts/TransactionsContext"
import { useContextSelector } from "use-context-selector"

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

interface SearchFormProps {
  resetPagination: () => void
}

export function SearchForm({ resetPagination }: SearchFormProps) {
  const { setTransactionQuery } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        fetchTransactions: context.fetchTransactions,
        setTransactionQuery: context.setTransactionQuery,
      }
    }
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    const { query } = data

    setTransactionQuery(query)
    resetPagination()
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={32} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
