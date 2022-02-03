import { ProfileModel } from '../models/profile';

export const updatePreferredCurrency = async (userID: string, currency: string) => {
  const user = await getExistedProfileOrCreateOne(userID)
  user.preferredCurrency = currency
  await user.save()
}

const getAccountByUserId = async (userID: string) => {
  const account = await ProfileModel.findOne({ userID })
  return account
}

export const getExistedProfileOrCreateOne = async (userID: string) => {
  const profile = await getAccountByUserId(userID)
  if (!profile) {
    const newProfile = new ProfileModel({ userID })
    await newProfile.save()
    return newProfile
  }
  return profile
}