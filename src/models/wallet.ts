; import mongoose, { Schema } from "mongoose";
import { currenciesNames } from "../data/supported-currencies";

export interface IAccount {
  userID: string;
  wallets: string[];
  preferredCurrency: string;
}

const AccountSchema: Schema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }, wallets: {
      type: [{
        type: String,
      }],
    },
    preferredCurrency: {
      type: String,
      enum: {
        values: currenciesNames,
        message: `{VALUE} is not a valid currency, supported currencies are: ${currenciesNames.join(', ')}`
      },
      default: 'eur'
    }
  }, {
  timestamps: true,
  versionKey: false
}
)

export const AccountModel = mongoose.model('Account', AccountSchema)