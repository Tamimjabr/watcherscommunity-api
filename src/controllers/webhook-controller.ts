import { Response, NextFunction } from 'express'
import ValidationError from '../errors/ValidationError'
import { CustomRequest } from '../middlewares/authorization-middleware'
import { addWebhook } from '../respository/webhook-respository'

export class WebhookController {
  async register (req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { secret, event, url } = req.body
      const userID = req.user?.userID || ''
      await addWebhook(userID, {
        event, url, secret
      })
      res.status(201).json({
        message: 'Webhook registered successfully'
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