import mongoose, { Schema, Document, Model } from "mongoose";
import validator from 'validator'
import bcrypt from "bcrypt";

const { isEmail } = validator

export interface IUser {
  email: string
  password: string
}

interface IUserDocument extends IUser, Document {
  checkPassword: (password: string) => Promise<boolean>
}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [isEmail, '{VALUE} is not a valid email']
    },
    password: {
      type: String,
      minlength: [8, 'Passowrd must be at least 8 characters long'],
      required: [true, 'Password is required']
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

UserSchema.pre('save', async function preSave (this: IUserDocument, next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.checkPassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password)
  return result;
};

export const UserModel = mongoose.model<IUserDocument>("User", UserSchema)
