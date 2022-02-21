import { Response, NextFunction } from 'express'
import { WebhookHeaders } from '../data/webhook-header'
import ValidationError from '../errors/ValidationError'
import { CustomRequest } from '../middlewares/authorization-middleware'
import { addWebhook, removeRegisteredWebhookForEvent } from '../respository/webhook-respository'

export class WebhookController {
  async register (req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { secret, event, url } = req.body
      const userID = req.user?.userID || ''
      await addWebhook(userID, {
        event, url, secret
      })
      res.status(201).json({
        message: `Webhook registered successfully. Your secret will be available on the header ${WebhookHeaders.XWatchersCommunitySecret}`,
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

  async unregister (req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userID = req.user?.userID || ''
      await removeRegisteredWebhookForEvent(userID, req.body.event)
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}