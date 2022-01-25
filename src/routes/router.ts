import express, { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import { router as v1Router } from './api/v1/router'

export const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to our API')
})

router.use('/api/v1', v1Router)

router.use('*', (req: Request, res: Response, next: NextFunction) => next(createError(404)))