import createError from 'http-errors';
import { generateJWT, Payload, decodeJWT } from './../helpers/jwt-generator';
import { addUser, authorizeUser, getUser } from './../respository/auth-respository';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'
import ConflictError from '../errors/ConflictError';
import ValidationError from '../errors/ValidationError';
import InvalidTokenError from '../errors/InvalidToken';


const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE } = process.env

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
      const tokens = this._generateAccessRefreshTokens(user._id)
      res.status(200).json(tokens)
    } catch (error: any) {
      let err = error
      err.innerException = error
      next(error)
    }
  }

  async refresh (req: Request, res: Response, next: NextFunction) {
    const { refresh_token } = req.body

    if (!refresh_token) {
      next(new InvalidTokenError('refresh'))
      return
    }
    try {
      jwt.verify(refresh_token, REFRESH_TOKEN_SECRET!)
      const decoded: Payload = decodeJWT(refresh_token)
      const user = await getUser(decoded.userID)
      if (!user || user.id !== decoded.userID) {
        next(new InvalidTokenError('refresh'))
        return
      }
      const tokens = this._generateAccessRefreshTokens(decoded?.userID)
      res.status(201).json(tokens)
    } catch (error) {
      next(createError(403))
    }
  }

  _generateAccessRefreshTokens (userID: string) {
    const access_token = generateJWT({ userID }, ACCESS_TOKEN_SECRET!, ACCESS_TOKEN_LIFE!)
    const refresh_token = generateJWT({ userID }, REFRESH_TOKEN_SECRET!, REFRESH_TOKEN_LIFE!)
    return { access_token, refresh_token }
  }
}
