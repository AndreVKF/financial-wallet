interface ErrorHandlerProps {
  message: string
  statusCode?: number
}

export class ErrorHandler {
  message: string
  statusCode: number

  constructor({ message, statusCode = 400 }: ErrorHandlerProps) {
    this.message = message
    this.statusCode = statusCode
  }
}
