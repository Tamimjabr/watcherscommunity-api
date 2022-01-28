export default class InvalidCredentialsError extends Error {
  status: number
  message: string
  stack: string | undefined

  constructor(message: string = 'Invalid credentials') {
    super(message)
    this.message = message
    this.status = 401
    this.stack = super.stack
  }
}