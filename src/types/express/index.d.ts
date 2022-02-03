declare namespace Express {
  interface Request {
    jwt?: any,
    user?: {
      userID: string
    }
  }
}