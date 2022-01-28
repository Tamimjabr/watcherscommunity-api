import InvalidCredentialsError from "../errors/InvalidCredentialsError"
import { IUser, UserModel } from "../models/user"

export const addUser = async (user: IUser) => {
  const newUser = new UserModel(user)
  const savedUser = await newUser.save()
  await newUser.setPassword(user.password)
  return savedUser
}

export const getUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email })
  return user
}

export const getUserById = async (id: string) => {
  const user = await UserModel.findById({ _id: id })
  return user
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