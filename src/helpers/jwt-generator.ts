import jwt from 'jsonwebtoken';

export type Payload = {
  userID: string
}

export const generateJWT = (payload: Payload, secret: string, life: string): string => {
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: life });
}

export const decodeJWT = (token: string): Payload => {
  return jwt.decode(token) as Payload;
}