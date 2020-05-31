export type Token = {
  jwt: string
  expiry: string
}

export type TokenCollection = {
  accessToken: Token
  refreshToken: Token
}

export type User = {
  id: string
  name: string
  email: string
  token: TokenCollection
}
