import React, { FunctionComponent } from 'react'

import LoginComponent from './auth/login/Login'
import RedirectIfLoggedIn from './auth/redirect-if-logged-in/RedirectIfLoggedIn'
import RequireLogin from './auth/require-login/RequireLogin'
import SignUpComponent from './auth/sign-up/SignUp'
import LandingComponent from './landing/Landing'
import BaseCurrencyComponent from './setup/base-currency/BaseCurrency'

export type Route = {
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

export const LoginScreen: Route = {
  id: 1,
  name: 'Login',
  path: '/login',
  exact: true,
  component: () => (
    <RedirectIfLoggedIn redirectTo={SetupBaseCurrencyScreen}>
      <LoginComponent />
    </RedirectIfLoggedIn>
  ),
}

export const SignUpScreen: Route = {
  id: 2,
  name: 'SignUp',
  path: '/sign-up',
  exact: true,
  component: () => (
    <RedirectIfLoggedIn redirectTo={SetupBaseCurrencyScreen}>
      <SignUpComponent />
    </RedirectIfLoggedIn>
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
