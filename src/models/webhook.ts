import mongoose, { Schema } from "mongoose";
import { supportedEvents } from "../data/supprted-events-webhook";

export interface IWebhook {
  url: string;
  userID: string;
  events: string[];
}

const WebhookSchema: Schema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    events: {
      type: [{
        type: String,
      }],
      enum: {
        values: supportedEvents,
        message: `{VALUE} is not a valid event, supported events are: ${supportedEvents.join(', ')}`
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)


export const WebhookModel = mongoose.model('Webhook', WebhookSchema)
