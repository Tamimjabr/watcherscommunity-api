import { jwt } from 'jsonwebtoken';
import { createError } from 'http-errors';
import { NextFunction, Request, Response } from "express";
import InvalidTokenError from "../errors/InvalidToken";


const authorizeJWT = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization?.split(' ')

  if (authorization?.[0] !== 'Bearer') {
    next(new InvalidTokenError('access'))
    return
  }

  try {
    req.jwt = jwt.verify(authorization[1], process.env.ACCESS_TOKEN_SECRET!)

  } catch (error) {
    next(createError(403))
  }
}
