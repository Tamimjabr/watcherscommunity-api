import { WebhookHeaders } from './../data/webhook-header';
import express, { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import { router as v1Router } from './api/v1/router'

export const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to our API')
})

router.use('/api', v1Router)


// ? code used to test webhook
// router.post('/api', (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.body)
//   console.log(req.headers)
//   console.log(req.headers[WebhookHeaders.XWatchersCommunitySecret])

//   res.send({
//     date: req.body.date,
//     event: req.body.event,
//   })
// })

router.use('*', (req: Request, res: Response, next: NextFunction) => next(createError(404)))