import { Request } from 'express';


export const createAuthLinks = (req: Request) => {
  const controllerName = req.path.split('/').pop()!
  const links = [
    {
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(controllerName, 'register')}`,
      method: 'POST',
      description: 'Register a new user',
      bodyContent: {
        email: 'string',
        password: 'string'
      }
    },
    {
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(controllerName, 'login')}`,
      method: 'POST',
      description: 'Login a user',
      bodyContent: {
        email: 'string',
        password: 'string'
      }
    },
    {
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(controllerName, 'refresh')}`,
      method: 'POST',
      description: 'Refresh a user token',
      bodyContent: {
        refresh_token: 'string'
      }
    },
    {
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(controllerName, 'logout')}`,
      method: 'DELETE',
      description: 'Logout a user',
      bodyContent: {
        access_token: 'string',
        refresh_token: 'string'
      }
    }
  ]

  return links
}