import { connectDB } from '../config/mongoose';
import { UserModel } from "../models/user"
import { ProfileModel } from "../models/profile"
import { UserWebhookModel } from "../models/webhook"
import { TokenModel } from '../models/token';
import TESTDATA from '../data/test-data'

const seedDB = async () => {
  await connectDB()

  await UserModel.deleteMany()
  await TokenModel.deleteMany()
  await ProfileModel.deleteMany()
  await UserWebhookModel.deleteMany()

  const savedUsers = await UserModel.insertMany(TESTDATA.users)

  const profilesToInsert = TESTDATA.profiles.map((profile, index) => {
    return { ...profile, userID: savedUsers[index]._id }
  })
  await ProfileModel.insertMany(profilesToInsert)

  const webhooksToInsert = TESTDATA.webhooks.map((webhook, index) => {
    return { ...webhook, userID: savedUsers[index]._id }
  })
  await UserWebhookModel.insertMany(webhooksToInsert)

  console.log('Data has been seeded successfully')
  process.exit()
}

try {
  seedDB()
} catch (error) {
  console.log(error)
  process.exit(1)
}
