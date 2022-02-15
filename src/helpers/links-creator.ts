import { Request } from 'express';
import { currenciesNames } from '../data/supported-currencies';

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
  const linksObject: {
    [key: string]: Link | undefined
  } = {
    register: {
      name: 'register',
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(controllerName, 'register')}`,
      method: 'POST',
      description: 'Register a new user',
      bodyContent: {
        email: 'string',
        password: 'string'
      }
    },
    login: {
      name: 'login',
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(controllerName, 'login')}`,
      method: 'POST',
      description: 'Login a user',
      bodyContent: {
        email: 'string',
        password: 'string'
      }
    },
    refresh: {
      name: 'refresh',
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(controllerName, 'refresh')}`,
      method: 'POST',
      description: 'Refresh a user token',
      bodyContent: {
        refresh_token: 'string'
      }
    },
    logout: {
      name: 'logout',
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(controllerName, 'logout')}`,
      method: 'DELETE',
      description: 'Logout a user',
      bodyContent: {
        access_token: 'string',
        refresh_token: 'string'
      }
    }
  }

  if (linksObject[controllerName]) {
    linksObject.self = linksObject[controllerName]
    delete linksObject[controllerName]
  }

  return linksObject
}

export const createProfileLinks = (req: Request) => {
  const profilePartInRequest = req.path.split('/').pop()!
  const LinksObject: {
    [key: string]: Link | undefined
  } = {
    preferredCurrency: {
      name: 'preferred-currency',
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(profilePartInRequest, 'preferred-currency')}`,
      method: 'GET',
      description: 'Get preferred currency of a user',
      bodyContent: {}
    },
    preferredCurrencyUpdate: {
      name: 'preferred-currency',
      URL: `${req.protocol}://${req.get('host')
        }${req.originalUrl.replace(profilePartInRequest, 'preferred-currency')}`,
      method: 'PUT',
      description: 'Update preferred currency of a user',
      bodyContent: {
        currency: currenciesNames.join(' | ')
      }
    },
    wallets: {
      name: 'wallets',
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(profilePartInRequest, 'wallets')}`,
      method: 'GET',
      description: 'Get wallets of a user',
      bodyContent: {}
    },
    walletsAdd: {
      name: 'wallets',
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(profilePartInRequest, 'wallets')}`,
      method: 'POST',
      description: 'Add a wallet to a user',
      bodyContent: {
        wallet: 'string'
      }
    },
    walletsDelete: {
      name: 'wallets',
      URL: `${req.protocol}://${req.get('host')}${req.originalUrl.replace(profilePartInRequest, 'wallets')}`,
      method: 'DELETE',
      description: 'Delete a wallet from a user',
      bodyContent: {
        wallet: 'string'
      }
    }
  }

  if (profilePartInRequest === 'preferred-currency') {
    console.log(req.method)
    switch (req.method) {
      case 'GET':
        LinksObject.self = LinksObject.preferredCurrency
        delete LinksObject.preferredCurrency
        break;
      case 'PUT':
        LinksObject.self = LinksObject.preferredCurrencyUpdate
        delete LinksObject.preferredCurrencyUpdate
        break;
      default:
        break;
    }

  } else if (profilePartInRequest === 'wallets') {
    console.log(req.method)
    switch (req.method) {
      case 'GET':
        LinksObject.self = LinksObject.wallets
        delete LinksObject.wallets
        break;
      case 'POST':
        LinksObject.self = LinksObject.walletsAdd
        delete LinksObject.walletsAdd
        break;
      default:
        break;
    }
  }

  return LinksObject
}