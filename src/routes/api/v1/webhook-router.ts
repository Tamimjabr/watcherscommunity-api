import express from 'express'
import { WebhookController } from '../../../controllers/webhook-controller'
import { authorizeJWT } from '../../../middlewares/authorization-middleware';

export const router = express.Router()
const controller = new WebhookController()

router.use(authorizeJWT)

router.post('/register', (req, res, next) => {
  controller.register(req, res, next)
})

router.delete('/unregister', (req, res, next) => {
  controller.unregister(req, res, next)
})