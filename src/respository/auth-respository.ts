import InvalidCredentialsError from "../errors/InvalidCredentialsError"
import { IUser, UserModel } from "../models/user"

export const addUser = async (user: IUser) => {
  const newUser = new UserModel(user)
  const savedUser = await newUser.save()
  await newUser.setPassword(user.password)
  return savedUser
}

export const getUser = async (email: string) => {
  const user = await UserModel.findOne({ email })
  return user
}

export const authorizeUser = async (email: string, password: string) => {
  const user = await getUser(email)
  if (user) {
    const authorized = await user.checkPassword(password)
    if (authorized) {
      return user
    }
  }
  throw new InvalidCredentialsError()
}

  // async login (email: string, password: string): Promise<User> {
  //   const user = await this.userModel.findOne({ email })
  //   if (!user) {
  //     throw new Error('Invalid credentials')
  //   }
  //   const isMatch = await user.comparePassword(password)
  //   if (!isMatch) {
  //     throw new Error('Invalid credentials')
  //   }
  //   return user
  // }

  // async getUser (id: string): Promise<User> {
  //   return await this.userModel.findById(id)
  // }

  // async getUserByEmail (email: string): Promise<User> {
  //   return await this.userModel.findOne({ email })
  // }
