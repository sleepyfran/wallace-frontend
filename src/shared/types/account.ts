export enum AccountType {
  checking,
  savings,
  cash,
}

export type Account = {
  name: string
  balance: number
  type: AccountType
}
