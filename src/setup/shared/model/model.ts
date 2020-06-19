import { capitalize } from 'lodash'

export enum AccountType {
  checking,
  savings,
  cash,
}

export const AccountTypes = [
  AccountType[AccountType.cash],
  AccountType[AccountType.checking],
  AccountType[AccountType.savings],
]

export const AccountTypesSelect = AccountTypes.map(at => ({
  label: capitalize(at),
  value: at,
}))

export type FirstAccount = {
  name: string
  initialBalance: string
  type: AccountType
}
