import { WebhookHeaders } from './../data/webhook-header';
import { getUserWebhookForSpecificEvent } from './../respository/webhook-respository';
import axios from "axios";
import EventEmitter from "events";
import moment from "moment";
import { IWebhook } from "../models/webhook";
import { Events } from '../data/supprted-events-webhook';

export const emitter = new EventEmitter();

export const addEventListener = () => {
  emitter.on(Events.LoginEvent, async (userID) => {
    try {
      const userWebhookForEvent: IWebhook = await getUserWebhookForSpecificEvent(userID, Events.LoginEvent)
      if (userWebhookForEvent) {
        await postLoginEventHook(userWebhookForEvent.url, userWebhookForEvent.secret)
        console.log(`Webhook sent to ${userWebhookForEvent.url} ${userWebhookForEvent.secret}`)
      } else {
        console.log("No webhook registered for this event")
      }
    } catch (error: any) {
      console.log('Failed to send webhook to the given url')
    }
  })
}

const postLoginEventHook = async (url: string, secret: string) => {
  const headers = {
    'Content-Type': 'application/json',
    [WebhookHeaders.XWatchersCommunitySecret]: secret
  }
  const data = {
    event: Events.LoginEvent,
    date: moment().toISOString(),
  }
  await axios.post(url, data, { headers })
}