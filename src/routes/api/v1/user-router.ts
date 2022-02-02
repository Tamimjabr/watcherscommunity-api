import { UserController } from './../../../controllers/user-controller';
import express from 'express'

export const router = express.Router()

const controller = new UserController()

// todo add authoization middleware
router.put('/:id/preferred-currency', (req, res, next) => {
  controller.updatePreferredCurrency(req, res, next)
})