import jwt from 'jsonwebtoken';

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE } = process.env

export type Payload = {
  userID: string
}

export const decodeJWT = (token: string): Payload => {
  return jwt.decode(token) as Payload;
}

export const generateAccessRefreshTokens = (userID: string): { access_token: string, refresh_token: string } => {
  const access_token = generateJWT({ userID }, ACCESS_TOKEN_SECRET!, ACCESS_TOKEN_LIFE!)
  const refresh_token = generateJWT({ userID }, REFRESH_TOKEN_SECRET!, REFRESH_TOKEN_LIFE!)
  return { access_token, refresh_token }
}

export const generateAccessToken = (userID: string): string => {
  return generateJWT({ userID }, ACCESS_TOKEN_SECRET!, ACCESS_TOKEN_LIFE!)
}

const generateJWT = (payload: Payload, secret: string, life: string): string => {
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: life });
}