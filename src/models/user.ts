import mongoose, { Schema, Document, Model } from "mongoose";
import validator from 'validator'
import bcrypt from "bcrypt";

const { isEmail } = validator

export interface IUser {
  email: string;
  password: string;
}

interface IUserDocument extends IUser, Document {
  hashPassword: (password: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {
  findByemail: (email: string) => Promise<IUserDocument>;
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

UserSchema.methods.hashPassword = async function (password: string) {
  const hash = await bcrypt.hash(password, 10);
  this.password = hash;
};

UserSchema.methods.checkPassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

export const UserModel = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
