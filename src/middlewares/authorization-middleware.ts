import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from "express";
import InvalidTokenError from "../errors/InvalidToken";

export interface CustomRequest extends Request {
  jwt?: any,
  user?: {
    userID: string
  }
}

export const authorizeJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization?.split(' ')

  if (authorization?.[0] !== 'Bearer') {
    next(new InvalidTokenError('access'))
    return
  }

  try {
    req.jwt = jwt.verify(authorization[1], process.env.ACCESS_TOKEN_SECRET!)
    req.user = {
      userID: req.jwt.userID
    }

    next()
  } catch (error) {
    next(createError(403))
  }
}
