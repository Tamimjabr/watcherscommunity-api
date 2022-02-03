import { AccountModel } from './../models/wallet';
import InvalidUserIDError from "../errors/InvalidUserID"

export const updatePreferredCurrency = async (userID: string, currency: string) => {
  const user = await getAccountByUserId(userID)
  if (user) {
    user.preferredCurrency = currency
    await user.save()
  } else {
    throw new InvalidUserIDError()
  }
}

export const getAccountByUserId = async (userID: string) => {
  const account = await AccountModel.findOne({ userID })
  return account
}