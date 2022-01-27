export default class ValidationError extends Error {
  status: number
  message: string
  stack: string | undefined

  constructor(message: string) {
    super(message)
    this.message = message
    this.status = 400
    this.stack = super.stack
  }
}