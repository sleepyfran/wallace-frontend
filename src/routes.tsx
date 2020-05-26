import React, { FunctionComponent } from 'react'

import LoginComponent from './auth/login/Login'
import RequireLogin from './auth/require-login/RequireLogin'
import SignUpComponent from './auth/sign-up/SignUp'
import LandingComponent from './landing/Landing'
import BaseCurrencyComponent from './setup/base-currency/BaseCurrency'

type Route = {
  id: number
  name: string
  path: string
  exact?: boolean
  component: FunctionComponent
}

export const LandingScreen: Route = {
  id: 0,
  name: 'Landing',
  path: '/',
  exact: true,
  component: LandingComponent,
}

export const LoginScreen: Route = {
  id: 1,
  name: 'Login',
  path: '/login',
  exact: true,
  component: LoginComponent,
}

export const SignUpScreen: Route = {
  id: 2,
  name: 'SignUp',
  path: '/sign-up',
  exact: true,
  component: SignUpComponent,
}

export const SetupBaseCurrencyScreen: Route = {
  id: 3,
  name: 'BaseCurrency',
  path: '/setup/baseCurrency',
  exact: true,
  component: () => (
    <RequireLogin>
      <BaseCurrencyComponent />
    </RequireLogin>
  ),
}

/**
 * Routes of the app.
 */
export default [
  LandingScreen,
  LoginScreen,
  SignUpScreen,
  SetupBaseCurrencyScreen,
]
