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

export const generateAccessRefreshTokens = (userID: string): { access_token: string, refresh_token: string } => {
  const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE } = process.env
  const access_token = generateJWT({ userID }, ACCESS_TOKEN_SECRET!, ACCESS_TOKEN_LIFE!)
  const refresh_token = generateJWT({ userID }, REFRESH_TOKEN_SECRET!, REFRESH_TOKEN_LIFE!)
  return { access_token, refresh_token }
}