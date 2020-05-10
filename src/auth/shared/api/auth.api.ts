import Api, { Response } from '../../../shared/api/api'
import { User } from '../../../shared/types/user'
import { UserLogin, UserSignUp } from '../model/model'

export const login = (data: UserLogin): Response<User> =>
  Api.post(process.env.REACT_APP_AUTH_LOGIN_ENDPOINT!, data)

export const signUp = (data: UserSignUp): Response<User> =>
  Api.post(process.env.REACT_APP_AUTH_SIGN_UP_ENDPOINT!, data)
