
import axios from "axios";
import EventEmitter from "events";
import moment from "moment";
import { getWebhookByUserID } from "../respository/webhook-respository";

export const emitter = new EventEmitter();

export const addEventListener = () => {
  emitter.on("loginAttempt", async (userID) => {
    try {
      const userWebhook = await getWebhookByUserID(userID)
      if (userWebhook && userWebhook.events.includes("loginAttempt")) {
        await postLoginAttemptHook(userWebhook.url)
        console.log(`Webhook sent to ${userWebhook.url}`)
      } else {
        console.log("No webhook registered for this event")
      }
    } catch (error: any) {
      console.log('Faild to send webhook to the given url')
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