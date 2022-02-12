import { connectDB } from '../config/mongoose';
import { UserModel } from "../models/user"
import { ProfileModel } from "../models/profile"
import { UserWebhookModel } from "../models/webhook"
import { TokenModel } from '../models/token';

const seedDB = async () => {
  await connectDB()
  await UserModel.deleteMany()
  await TokenModel.deleteMany()
  await ProfileModel.deleteMany()
  await UserWebhookModel.deleteMany()

  console.log('Data has been seeded successfully')
  process.exit()
}

seedDB().catch(console.error)