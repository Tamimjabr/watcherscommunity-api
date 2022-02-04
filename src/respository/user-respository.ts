import InvalidCredentialsError from "../errors/InvalidCredentialsError"
import { IUser, UserModel } from "../models/user"

export const addUser = async (user: IUser) => {
  const newUser = new UserModel(user)
  return await newUser.save()
}

export const getUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email })
}

export const getUserById = async (id: string) => {
  return await UserModel.findById({ _id: id })
}

export const authorizeUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email)
  if (user) {
    const authorized = await user.checkPassword(password)
    if (authorized) {
      return user
    }
  }
  throw new InvalidCredentialsError()
}
