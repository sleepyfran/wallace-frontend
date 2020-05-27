type Token = {
  jwt: string
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
