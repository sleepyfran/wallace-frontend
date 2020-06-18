import Api from '../../../shared/api/api'
import { Token, TokenCollection, User } from '../../../shared/types/user'
import { UserLogin, UserSignUp } from '../model/model'

export const login = (data: UserLogin) =>
  Api.post<User>(process.env.REACT_APP_AUTH_LOGIN_ENDPOINT!, data)

export const signUp = (data: UserSignUp) =>
  Api.post<User>(process.env.REACT_APP_AUTH_SIGN_UP_ENDPOINT!, data)

export const refreshToken = (data: Token) =>
  Api.post<TokenCollection>(process.env.REACT_APP_AUTH_REFRESH_ENDPOINT!, data)
