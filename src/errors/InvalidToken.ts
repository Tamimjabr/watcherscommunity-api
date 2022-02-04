export default class InvalidTokenError extends Error {
  status: number
  message: string
  stack: string | undefined

  constructor(tokenType: string) {
    const message = `Unauthorized. No valid ${tokenType} token`
    super(message)
    this.message = message
    this.status = 401
    this.stack = super.stack
  }
}