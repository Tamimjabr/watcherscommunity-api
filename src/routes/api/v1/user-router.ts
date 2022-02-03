import { authorizeJWT } from './../../../middlewares/authorization-middleware';
import { UserController } from './../../../controllers/user-controller';
import express from 'express'

export const router = express.Router()
const controller = new UserController()

router.use(authorizeJWT)

router.put('/preferred-currency', (req, res, next) => {
  controller.updatePreferredCurrency(req, res, next)
})