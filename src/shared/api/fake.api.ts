import { User } from '../types/user'
import { Currency } from '../types/currency'
import Api, { Result } from './interface'
import { of, throwError, Observable } from 'rxjs'

type EndpointResult = {
  get?: any
  post?: any
  put?: any
  delete?: any
  requireAuth?: boolean
  shouldError?: boolean
}

type EndpointResults = {
  [endpoint: string]: EndpointResult
}

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

const wrapResult = (result: any): Observable<Result<any>> => {
  if (result.shouldError) return throwError('')

  return of({
    statusCode: 200,
    data: result,
  })
}

const fakeApi: Api = {
  get: endpoint => wrapResult(endpointResults[endpoint].get),
  post: endpoint => wrapResult(endpointResults[endpoint].post),
  put: endpoint => wrapResult(endpointResults[endpoint].put),
  delete: endpoint => wrapResult(endpointResults[endpoint].delete),
}

export default fakeApi
