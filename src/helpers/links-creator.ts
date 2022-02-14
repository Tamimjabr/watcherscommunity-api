import { Request } from 'express';

type Link = {
  name: string,
  URL: string
  method: string,
  description: string
  bodyContent: {
    [key: string]: string
  }
}

export const createAuthLinks = (req: Request) => {
  const controllerName = req.path.split('/').pop()!
  const links: Link[] = [
    {
      name: 'register',
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(controllerName, 'register')}`,
      method: 'POST',
      description: 'Register a new user',
      bodyContent: {
        email: 'string',
        password: 'string'
      }
    },
    {
      name: 'login',
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(controllerName, 'login')}`,
      method: 'POST',
      description: 'Login a user',
      bodyContent: {
        email: 'string',
        password: 'string'
      }
    },
    {
      name: 'refresh',
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(controllerName, 'refresh')}`,
      method: 'POST',
      description: 'Refresh a user token',
      bodyContent: {
        refresh_token: 'string'
      }
    },
    {
      name: 'logout',
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(controllerName, 'logout')}`,
      method: 'DELETE',
      description: 'Logout a user',
      bodyContent: {
        access_token: 'string',
        refresh_token: 'string'
      }
    }
  ]

  const linksObject: {
    [key: string]: Link | undefined
  } = {
    register: links.find(link => link.name === 'register'),
    login: links.find(link => link.name === 'login'),
    refresh: links.find(link => link.name === 'refresh'),
    logout: links.find(link => link.name === 'logout')
  }

  if (linksObject[controllerName]) {
    linksObject.self = linksObject[controllerName]
    delete linksObject[controllerName]
  }

  return linksObject
}
