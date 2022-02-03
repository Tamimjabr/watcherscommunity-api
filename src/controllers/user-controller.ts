import { Request, Response, NextFunction } from 'express'
import ValidationError from '../errors/ValidationError';
import { CustomRequest } from '../middlewares/authorization-middleware';
import { updatePreferredCurrency } from '../respository/user-respository'

export class UserController {

  async updatePreferredCurrency (req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userID = req.user?.userID || ''
      const currency = req.body.currency as string
      await updatePreferredCurrency(userID, currency)

      res.status(204).end()
    } catch (error: any) {
      let err = error
      if (error.name === 'ValidationError') {
        err = new ValidationError(Object.values(error.errors)
          .map((val: any) => val.message)[0]
          .toString()
        )
      }
      err.innerException = error
      next(err)
    }
  }
}