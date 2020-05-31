import Api, { Response } from '../../../shared/api/api'
import { User, TokenCollection, Token } from '../../../shared/types/user'
import { UserLogin, UserSignUp } from '../model/model'

export const login = (data: UserLogin): Response<User> =>
  Api.post(process.env.REACT_APP_AUTH_LOGIN_ENDPOINT!, data)

export const signUp = (data: UserSignUp): Response<User> =>
  Api.post(process.env.REACT_APP_AUTH_SIGN_UP_ENDPOINT!, data)

export const refreshToken = (data: Token): Response<TokenCollection> =>
  Api.post(process.env.REACT_APP_AUTH_REFRESH_ENDPOINT!, data)
