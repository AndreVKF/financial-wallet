import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react"
import {
  Overlay,
  Content,
  Close,
  TransactionType,
  TransactionTypeButton,
} from "./styles"

import * as Dialog from "@radix-ui/react-dialog"

import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TransactionsContext } from "../../contexts/TransactionsContext"
import { useContextSelector } from "use-context-selector"

const newTransactionFromSchema = z.object({
  description: z.string(),
  value: z.coerce.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFromSchema>

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFromSchema),
    defaultValues: {
      type: "income",
    },
  })

  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    }
  )

  async function handlerCreateNewTransaction(data: NewTransactionFormInputs) {
    await createTransaction(data)
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <Close>
          <X />
        </Close>

        <form action="" onSubmit={handleSubmit(handlerCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="text"
            placeholder="Preço"
            required
            {...register("value", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
