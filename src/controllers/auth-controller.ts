import { addUser, authorizeUser } from './../respository/auth-respository';
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express'
import ConflictError from '../errors/ConflictError';
import ValidationError from '../errors/ValidationError';


export class AuthController {

  async register (req: Request, res: Response, next: NextFunction) {
    try {
      const user = await addUser({
        email: req.body.email,
        password: req.body.password
      })

      res.status(201).json({
        userID: user._id
      })
    } catch (error: any) {
      let err = error
      if (err.code === 11000) {
        // Duplicated keys.
        err = new ConflictError('Email')
      } else if (error.name === 'ValidationError') {
        err = new ValidationError(Object.values(error.errors)
          .map((val: any) => val.message)[0]
          .toString()
        )
      }
      err.innerException = error
      next(err)
    }
  }

  async login (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const user = await authorizeUser(email, password)

      res.status(200).json({
        userID: user._id
      })
    } catch (error: any) {
      let err = error
      err.innerException = error
      next(error)
    }
  }

}
