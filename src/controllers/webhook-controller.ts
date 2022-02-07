
export class WebhookController{
  async register(req, res, next){
    const event = req.body.event
    const url = req.body.data.url
    // todo add event validation add event with user id and event type and url
    
  }

}