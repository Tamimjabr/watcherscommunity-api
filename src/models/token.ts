import mongoose, { Schema } from "mongoose";

export interface IToken {
  refreshToken: string;
  userID: string;
}

const TokenSchema: Schema = new Schema(
  {
    refreshToken: {
      type: String,
      required: true,
      trim: true
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
// remove tokens from DB on expiration (half year)
TokenSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 15778463 }
)

export const TokenModel = mongoose.model('Token', TokenSchema)
