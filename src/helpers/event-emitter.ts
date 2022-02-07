import { getUserWebhookForSpecificEvent } from './../respository/webhook-respository';
import axios from "axios";
import EventEmitter from "events";
import moment from "moment";
import { IWebhook } from "../models/webhook";

export const emitter = new EventEmitter();

export const addEventListener = () => {
  emitter.on("LoginAttempt", async (userID) => {
    try {
      const userWebhookForEvent: IWebhook = await getUserWebhookForSpecificEvent(userID, "LoginAttempt")
      if (userWebhookForEvent) {
        await postLoginAttemptHook(userWebhookForEvent.url)
        console.log(`Webhook sent to ${userWebhookForEvent.url}`)
      } else {
        console.log("No webhook registered for this event")
      }
    } catch (error: any) {
      console.log('Failed to send webhook to the given url')
    }
  })
}

const postLoginAttemptHook = async (url: string) => {
  const data = {
    event: "loginAttempt",
    date: moment().toISOString(),
  }
  await axios.post(url, data)
}