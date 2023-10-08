import { Dispatch, SetStateAction } from "react"
import { PaginationContainer, PaginationWrapper } from "./styles"

import { ArrowLeft, ArrowRight } from "phosphor-react"

interface PaginationProps {
  pagination: number
  setPagination: Dispatch<SetStateAction<number>>
  maxPagination: number
}

export function Pagination({
  pagination,
  setPagination,
  maxPagination,
}: PaginationProps) {
  const showLeft = pagination > 0
  const showRight = pagination < maxPagination

  const handlePreviousPagination = () => {
    if (pagination === 0) {
      return
    }

    setPagination((prev) => prev - 1)
  }

  const handleNextPagination = () => {
    if (pagination === maxPagination) {
      return
    }

    setPagination((prev) => prev + 1)
  }

  return (
    <PaginationContainer>
      <PaginationWrapper
        disabled={!showLeft}
        onClick={handlePreviousPagination}
      >
        <div>{showLeft && <ArrowLeft size={20} />}</div>
      </PaginationWrapper>

      <PaginationWrapper>
        <div>
          <span>{pagination + 1}</span>
        </div>
      </PaginationWrapper>

      <PaginationWrapper disabled={!showRight} onClick={handleNextPagination}>
        <div>{showRight && <ArrowRight size={20} />}</div>
      </PaginationWrapper>
    </PaginationContainer>
  )
}
