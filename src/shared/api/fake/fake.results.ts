import { Currency } from '../../types/currency'
import { User } from '../../types/user'
import { EndpointResults } from './types'

const fakeUser: User = {
  id: '12345',
  email: 'fake@fake.com',
  name: 'Fake Fakingtong',
  token: {
    accessToken: {
      jwt: 'faketoken',
      expiry: new Date().toString(),
    },
    refreshToken: {
      jwt: 'faketoken',
      expiry: new Date().toString(),
    },
  },
}

const fakeCurrencies: Currency[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
  },
  {
    code: 'CZK',
    name: 'Czech Koruna',
    symbol: 'Kč',
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
  },
]

const endpointResults: EndpointResults = {
  [process.env.REACT_APP_AUTH_LOGIN_ENDPOINT!]: {
    post: fakeUser,
  },
  [process.env.REACT_APP_AUTH_SIGN_UP_ENDPOINT!]: {
    post: fakeUser,
  },
  [process.env.REACT_APP_AUTH_REFRESH_ENDPOINT!]: {
    post: fakeUser,
  },
  [process.env.REACT_APP_CURRENCIES_ENDPOINT!]: {
    get: fakeCurrencies,
  },
}

export default endpointResults
