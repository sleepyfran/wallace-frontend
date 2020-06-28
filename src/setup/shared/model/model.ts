import { Option } from 'fp-ts/lib/Option'
import { capitalize } from 'lodash'

import { AccountType, Account } from '../../../shared/types/account'
import { Currency } from '../../../shared/types/currency'

export const AccountTypes = [
  AccountType[AccountType.cash],
  AccountType[AccountType.checking],
  AccountType[AccountType.savings],
]

export const AccountTypesSelect = AccountTypes.map(at => ({
  label: capitalize(at),
  value: at,
}))

export type FirstAccountInput = {
  name: string
  initialBalance: string
  type: AccountType
}

export enum CategorySelectionType {
  predefined,
  empty,
}

export type UserPreferences = {
  baseCurrency: Option<Currency>
  account: Option<Account>
  categoriesSelection: CategorySelectionType
}

export type UnwrappedUserPreferences = {
  baseCurrency: Currency
  account: Account
  categoriesSelection: CategorySelectionType
}
