import { ProfileModel } from '../models/profile';

export const updatePreferredCurrency = async (userID: string, currency: string) => {
  const user = await getExistedProfileOrCreateOne(userID)
  user.preferredCurrency = currency
  return await user.save()
}

export const addWallet = async (userID: string, wallet: string) => {
  const profile = await getExistedProfileOrCreateOne(userID)
  profile.wallets.push(wallet)
  profile.wallets = [...new Set(profile.wallets)]
  return await profile.save()
}

export const deleteWallet = async (userID: string, wallet: string) => {
  const profile = await getExistedProfileOrCreateOne(userID)
  profile.wallets = profile.wallets.filter((existedWallet: string) => existedWallet !== wallet)
  return await profile.save()
}

export const getExistedProfileOrCreateOne = async (userID: string) => {
  const profile = await getProfileByUserId(userID)
  if (!profile) {
    const newProfile = new ProfileModel({ userID })
    return await newProfile.save()
  }
  return profile
}

const getProfileByUserId = async (userID: string) => {
  return await ProfileModel.findOne({ userID })
}