export default class InvalidUserIDError extends Error {
  status: number
  message: string
  stack: string | undefined

  constructor() {
    const message = 'Invalid user ID'
    super(message)
    this.message = message
    this.status = 400
    this.stack = super.stack
  }
}