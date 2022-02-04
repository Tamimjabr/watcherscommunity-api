import { TokenModel, IToken } from './../models/token';

export const addToken = async (token: IToken) => {
  const newToken = new TokenModel(token)
  return await newToken.save()
}

export const getToken = async (refreshToken: string) => {
  return await TokenModel.findOne({ refreshToken })
}

export const getTokenByUserId = async (userID: string) => {
  return await TokenModel.findOne({ userID })
}

export const deleteToken = async (refreshToken: string) => {
  return await TokenModel.findOneAndDelete({ refreshToken })
}