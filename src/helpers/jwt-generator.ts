import jwt from 'jsonwebtoken';

type Paylod = {
  userID: string
}

export const generateJWT = (payload: Paylod, secret: string, life: string): string => {
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: life });
}