import { createProfileLinks } from './../helpers/links-creator';
import { addWallet, deleteWallet, getExistedProfileOrCreateOne } from './../respository/profile-repository';
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
        preferredCurrency: profile.preferredCurrency,
        links: createProfileLinks(req)
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
        URL: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        links: createProfileLinks(req)
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

  async getWallets (req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userID = req.user?.userID || ''
      const profile = await getExistedProfileOrCreateOne(userID)
      res.json({
        wallets: profile.wallets,
        links: createProfileLinks(req)
      })
    } catch (error) {
      next(error)
    }
  }

  async addWalletToPorfile (req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userID = req.user?.userID || ''
      const walletID = req.body.wallet as string
      await addWallet(userID, walletID)

      res.status(201).json({
        URL: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        walletID,
        links: createProfileLinks(req)
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

  async deleteWalletFromProfile (req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userID = req.user?.userID || ''
      const walletID = req.body.wallet as string
      await deleteWallet(userID, walletID)

      res.status(204).end()
    } catch (error: any) {
      next(error)
    }
  }
}