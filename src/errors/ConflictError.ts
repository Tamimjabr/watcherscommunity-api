export default class ConflictError extends Error {
  status: number
  message: string
  stack: string | undefined

  constructor(duplicatedKey: string) {
    const message = `${duplicatedKey} already exists`
    super(message)
    this.message = message
    this.status = 409
    this.stack = super.stack
  }
}