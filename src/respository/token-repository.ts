import { TokenModel, IToken } from './../models/token';

export const addToken = async (token: IToken) => {
  const newToken = new TokenModel(token)
  const savedToken = await newToken.save()
  return savedToken
}

export const getTokenByUserId = async (userID: string) => {
  const token = await TokenModel.findOne({ userID })
  return token
}

export const deleteTokenByUserId = async (userID: string) => {
  const deletedToken = await TokenModel.findOneAndDelete({ userID })
  return deletedToken
}