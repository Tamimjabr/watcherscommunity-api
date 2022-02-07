import { UserWebhookModel } from './../models/webhook';
import { IWebhook } from "../models/webhook";


export const addWebhook = async (userID: string, webhook: IWebhook) => {
  const userWebhook = await getExistedUserWebhookOrCreateOne(userID)
  const existedWebhookForEvent = userWebhook.webhooks.find((existedWebhook: IWebhook) => existedWebhook.event === webhook.event)

  if (existedWebhookForEvent) {
    existedWebhookForEvent.url = webhook.url
  } else {
    userWebhook.webhooks.push(webhook)
  }
  return await userWebhook.save()
}

export const getUserWebhookForSpecificEvent = async (userID: string, event: string) => {
  const userWebhook = await getWebhookByUserID(userID)
  if (userWebhook) {
    return userWebhook.webhooks.find((webhook: IWebhook) => webhook.event === event)
  }
  return null
}

const getWebhookByUserID = async (userID: string) => {
  return await UserWebhookModel.findOne({ userID })
}

const getExistedUserWebhookOrCreateOne = async (userID: string) => {
  const userWebhook = await getWebhookByUserID(userID)
  if (!userWebhook) {
    const newWebhook = new UserWebhookModel({ userID })
    return await newWebhook.save()
  }
  return userWebhook
}