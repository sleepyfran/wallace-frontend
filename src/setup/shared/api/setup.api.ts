import Api, { Response } from '../../../shared/api/api'
import { Currency } from '../../../shared/types/currency'

export const getCurrencies = (): Response<Currency[]> =>
  Api.get(process.env.REACT_APP_CURRENCIES_ENDPOINT!)
