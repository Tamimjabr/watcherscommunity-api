import express from 'express'
import { router as authRouter } from './auth-router'
import { router as userRouter } from './profile-router'

export const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to our API. V1')
})

router.use('/auth', authRouter)
router.use('/user/profile', userRouter)