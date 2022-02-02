import { Request, Response, NextFunction } from 'express'

export class UserController {

  async updatePreferredCurrency (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.params)

    } catch (error: any) {
      let err = error
      err.innerException = error
      next(err)
    }
  }
}