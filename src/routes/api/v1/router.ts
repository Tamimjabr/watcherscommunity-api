import express from 'express'
import { router as authRouter } from './auth-router'
import { router as userRouter } from './profile-router'
import { router as webhookRouter } from './webhook-router'

export const router = express.Router()

router.use('/auth', authRouter)
router.use('/users/:id/profile', userRouter)
router.use('/webhooks', webhookRouter)
