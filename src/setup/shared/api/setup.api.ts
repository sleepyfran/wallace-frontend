import Api from '../../../shared/api/api'

export const getCurrencies = () =>
  Api.get(process.env.REACT_APP_CURRENCIES_ENDPOINT!)
