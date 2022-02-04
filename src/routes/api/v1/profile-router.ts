import { authorizeJWT } from '../../../middlewares/authorization-middleware';
import { ProfileController } from '../../../controllers/profile-controller';
import express from 'express'

export const router = express.Router()
const controller = new ProfileController()

router.use(authorizeJWT)

router.get('/preferred-currency', (req, res, next) => {
  controller.getPreferredCurrency(req, res, next)
})

router.put('/preferred-currency', (req, res, next) => {
  controller.updatePreferredCurrency(req, res, next)
})


router.get('/wallets', (req, res, next) => {
  controller.getWallets(req, res, next)
})

router.post('/wallets', (req, res, next) => {
  controller.addWalletToPorfile(req, res, next)
})

router.delete('/wallets', (req, res, next) => {
  controller.deleteWalletFromProfile(req, res, next)
})