import { IUser, UserModel } from "../models/user"



export const addUser = async (user: IUser) => {
  const newUser = new UserModel(user)
  return await newUser.save()
}


  // async register (user: IUser): Promise<IUser> {
  //   const newUser = new UserModel(user)
  //   return await newUser.save()
  // }

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
