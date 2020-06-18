import Api from '../../../shared/api/api'
import { Currency } from '../../../shared/types/currency'

export const getCurrencies = () =>
  Api.get<Currency>(process.env.REACT_APP_CURRENCIES_ENDPOINT!)
