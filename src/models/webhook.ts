import { Events, SupportedEvents } from './../data/supprted-events-webhook';
import mongoose, { Schema } from "mongoose";
import { IUser } from './user';

export interface IUserWebhook {
  userID: IUser
  webhooks: IWebhook[]
}

export interface IWebhook {
  url: string
  event: Events
  secret: string
}

const WebhookSchema: Schema<IWebhook> = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true
    },
    event: {
      type: String,
      enum: {
        values: SupportedEvents,
        message: `{VALUE} is not a valid event, supported events are: ${SupportedEvents.join(', ')}`
      },
      required: true
    },
    secret: {
      type: String,
      required: [true, 'Secret is required to register webhook'],
      minlength: [8, 'Secret must be at least 8 characters long'],
    }
  }
)

const UserWebhookSchema: Schema<IUserWebhook> = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    webhooks: {
      type: [WebhookSchema],
      default: []
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)


export const UserWebhookModel = mongoose.model('Webhook', UserWebhookSchema)
