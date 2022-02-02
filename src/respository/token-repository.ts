import { TokenModel, IToken } from './../models/token';

export const addToken = async (token: IToken) => {
  const newToken = new TokenModel(token)
  const savedToken = await newToken.save()
  return savedToken
}

export const getToken = async (refreshToken: string) => {
  const token = await TokenModel.findOne({ refreshToken })
  return token
}

export const getTokenByUserId = async (userID: string) => {
  const token = await TokenModel.findOne({ userID })
  return token
}

export const deleteToken = async (refreshToken: string) => {
  const deletedToken = await TokenModel.findOneAndDelete({ refreshToken })
  return deletedToken
}