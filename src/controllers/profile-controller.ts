import { getExistedProfileOrCreateOne } from './../respository/profile-repository';
import { Response, NextFunction } from 'express'
import ValidationError from '../errors/ValidationError';
import { CustomRequest } from '../middlewares/authorization-middleware';
import { updatePreferredCurrency } from '../respository/profile-repository';

export class ProfileController {
  async getPreferredCurrency (req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userID = req.user?.userID || ''
      const profile = await getExistedProfileOrCreateOne(userID)
      res.json({
        preferredCurrency: profile.preferredCurrency
      })
    } catch (error) {
      next(error)
    }
  }

  async updatePreferredCurrency (req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userID = req.user?.userID || ''
      const currency = req.body.currency as string
      await updatePreferredCurrency(userID, currency)

      res.status(200).json({
        url: `/api/v1/user/profile/preferred-currency`
      })
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