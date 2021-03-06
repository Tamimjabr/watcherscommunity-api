import express from 'express'
import { AuthController } from '../../../controllers/auth-controller'

export const router = express.Router()
const controller = new AuthController()

router.post('/register', (req, res, next) => {
  controller.register(req, res, next)
})

router.post('/login', (req, res, next) => {
  controller.login(req, res, next)
})

router.post('/refresh', (req, res, next) => {
  controller.refresh(req, res, next)
})

router.delete('/logout', (req, res, next) => {
  controller.logout(req, res, next)
})