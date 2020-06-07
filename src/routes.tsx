import React from 'react'
import { PartialRouteObject } from 'react-router'

import LoginComponent from './auth/login/Login'
import RedirectIfLoggedIn from './auth/redirect-if-logged-in/RedirectIfLoggedIn'
import RequireLogin from './auth/require-login/RequireLogin'
import SignUpComponent from './auth/sign-up/SignUp'
import LandingComponent from './landing/Landing'
import BaseCurrencyComponent from './setup/base-currency/BaseCurrency'
import FirstAccountComponent from './setup/first-account/FirstAccount'

export const Paths = {
  landing: '/',
  login: '/login',
  setup: {
    baseCurrency: '/setup/base-currency',
    firstAccount: '/setup/first-account',
  },
  signUp: '/sign-up',
}

const LandingScreen: PartialRouteObject = {
  path: '/',
  element: <LandingComponent />,
}

const SetupScreen: PartialRouteObject = {
  path: '/setup',
  children: [
    {
      path: 'base-currency',
      element: (
        <RequireLogin>
          <BaseCurrencyComponent />
        </RequireLogin>
      ),
    },
    {
      path: 'first-account',
      element: (
        <RequireLogin>
          <FirstAccountComponent />
        </RequireLogin>
      ),
    },
  ],
}

const LoginScreen: PartialRouteObject = {
  path: '/login',
  element: (
    <RedirectIfLoggedIn redirectTo={Paths.setup.baseCurrency}>
      <LoginComponent />
    </RedirectIfLoggedIn>
  ),
}

const SignUpScreen: PartialRouteObject = {
  path: '/sign-up',
  element: (
    <RedirectIfLoggedIn redirectTo={Paths.setup.firstAccount}>
      <SignUpComponent />
    </RedirectIfLoggedIn>
  ),
}

/**
 * Routes of the app.
 */
export default [LandingScreen, LoginScreen, SignUpScreen, SetupScreen]
