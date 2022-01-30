import { addToken, getTokenByUserId } from './../respository/token-repository';
import createError from 'http-errors';
import { generateJWT, Payload, decodeJWT, generateAccessRefreshTokens, generateAccessToken } from './../helpers/jwt-generator';
import { addUser, authorizeUser, getUserById } from './../respository/auth-respository';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'
import ConflictError from '../errors/ConflictError';
import ValidationError from '../errors/ValidationError';
import InvalidTokenError from '../errors/InvalidToken';


const { REFRESH_TOKEN_SECRET } = process.env

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
      const tokens = generateAccessRefreshTokens(user._id)
      await addToken({ userID: user._id, refreshToken: tokens.refresh_token })
      res.status(200).json(tokens)
    } catch (error: any) {
      let err = error
      err.innerException = error
      next(error)
    }
  }

  async refresh (req: Request, res: Response, next: NextFunction) {
    try {
      const { refresh_token } = req.body
      jwt.verify(refresh_token, REFRESH_TOKEN_SECRET!)
      const decoded: Payload = decodeJWT(refresh_token)
      const tokenInDB = await getTokenByUserId(decoded.userID)
      const user = await getUserById(decoded.userID)
      if (!tokenInDB || !user) {
        next(new InvalidTokenError('refresh'))
        return
      }
      const accessToken = generateAccessToken(decoded?.userID)
      res.status(201).json({ access_token: accessToken })
    } catch (error) {
      next(createError(401))
    }
  }

}
