import { SupportedEvents } from './../data/supprted-events-webhook';
import mongoose, { Schema } from "mongoose";

export interface IUserWebhook {
  userID: string;
  webhooks: IWebhook[];
}

export interface IWebhook {
  url: string;
  event: string;
}

const WebhookSchema: Schema = new Schema(
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
    }
  }
)

const UserWebhookSchema: Schema = new Schema(
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
