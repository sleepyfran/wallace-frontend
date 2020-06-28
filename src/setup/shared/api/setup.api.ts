import Api from '../../../shared/api/api'
import { Currency } from '../../../shared/types/currency'
import { UnwrappedUserPreferences } from '../model/model'

export const getCurrencies = () =>
  Api.get<Currency>(process.env.REACT_APP_CURRENCIES_ENDPOINT!)

export const submitUserPreferences = (
  userPreferences: UnwrappedUserPreferences
) =>
  Api.post<UnwrappedUserPreferences>(
    process.env.REACT_APP_USER_PREFERENCES_ENDPOINT!,
    userPreferences
  )
