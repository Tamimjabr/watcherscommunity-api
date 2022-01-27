import express from 'express'
import { AuthController} from '../../../controllers/auth-controller'

export const router = express.Router()

const controller = new AuthController()

router.get('/', (req, res) => {
  res.send('Auth route')
})

router.post('register', (req, res, next) => {
  controller.register(req, res, next)
})