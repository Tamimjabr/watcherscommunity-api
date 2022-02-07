import express from 'express'
import { WebhookController } from '../../../controllers/webhook-controller'

export const router = express.Router()
const controller = new WebhookController()

router.post('/register', (req, res, next) => {
  controller.register(req, res, next)
})