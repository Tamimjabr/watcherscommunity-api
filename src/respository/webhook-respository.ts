import { WebhookModel } from './../models/webhook';
import { IWebhook } from "../models/webhook";


export const addWebhook = async (webhook: IWebhook) => {
  const userWebhook = await getExistedUserWebhookOrCreateOne(webhook)
  userWebhook.url = webhook.url
  userWebhook.events = userWebhook.events.concat(webhook.events)
  userWebhook.events = [...new Set(userWebhook.events)]
  return await userWebhook.save()
}

export const getWebhookByUserID = async (userID: string) => {
  return await WebhookModel.findOne({ userID })
}

export const getExistedUserWebhookOrCreateOne = async (webhook: IWebhook) => {
  const userWebhook = await getWebhookByUserID(webhook.userID)
  if (!userWebhook) {
    const newWebhook = new WebhookModel(webhook)
    return await newWebhook.save()
  }
  return userWebhook
}