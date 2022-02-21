import createError from 'http-errors';
import { UserWebhookModel } from './../models/webhook';
import { IWebhook } from "../models/webhook";


export const addWebhook = async (userID: string, webhook: IWebhook) => {
  const userWebhook = await getExistedUserWebhookOrCreateOne(userID)
  const existedWebhookForEvent = userWebhook.webhooks.find((existedWebhook: IWebhook) => existedWebhook.event === webhook.event)

  if (existedWebhookForEvent) {
    existedWebhookForEvent.url = webhook.url
    existedWebhookForEvent.secret = webhook.secret
  } else {
    userWebhook.webhooks.push(webhook)
  }
  return await userWebhook.save()
}

export const removeRegisteredWebhookForEvent = async (userID: string, event: string) => {
  const userWebhook = await getExistedUserWebhookOrCreateOne(userID)
  const existedWebhookForEvent = userWebhook.webhooks.find((existedWebhook: IWebhook) => existedWebhook.event === event)
  if (existedWebhookForEvent) {
    userWebhook.webhooks = userWebhook.webhooks.filter((existedWebhook: IWebhook) => existedWebhook.event !== event)
    return await userWebhook.save()
  }
  throw createError(404, `No Webhook for event ${event} was found`)
}

export const getUserWebhookForSpecificEvent = async (userID: string, event: string): Promise<IWebhook | null> => {
  const userWebhook = await getWebhookByUserID(userID)
  if (userWebhook) {
    const webhook = userWebhook.webhooks.find((webhook: IWebhook) => webhook.event === event)
    if (webhook) {
      return webhook
    }
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