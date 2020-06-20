import React from 'react'
import { PartialRouteObject as RouteObject } from 'react-router'

import LoginComponent from './auth/login/Login'
import RedirectIfLoggedIn from './auth/redirect-if-logged-in/RedirectIfLoggedIn'
import RequireLogin from './auth/require-login/RequireLogin'
import SignUpComponent from './auth/sign-up/SignUp'
import LandingComponent from './landing/Landing'
import BaseCurrencyComponent from './setup/base-currency/BaseCurrency'
import CategoriesComponent from './setup/categories/Categories'
import FirstAccountComponent from './setup/first-account/FirstAccount'
import SetupComponent from './setup/Setup'
import SetupRedirectPolicy from './setup/shared/redirect-policy'
import RedirectPolicy from './shared/components/RedirectPolicy'

export const Paths = {
  landing: '/',
  login: '/login',
  setup: {
    base: '/setup',
    baseCurrency: '/setup/base-currency',
    firstAccount: '/setup/first-account',
    categories: '/setup/categories',
  },
  signUp: '/sign-up',
}

const LandingScreen: RouteObject = {
  path: '/',
  element: <LandingComponent />,
}

const SetupScreen: RouteObject = {
  path: '/setup',
  element: (
    <RequireLogin>
      <RedirectPolicy policy={SetupRedirectPolicy}>
        <SetupComponent />
      </RedirectPolicy>
    </RequireLogin>
  ),
  children: [
    {
      path: 'base-currency',
      element: <BaseCurrencyComponent />,
    },
    {
      path: 'first-account',
      element: <FirstAccountComponent />,
    },
    {
      path: 'categories',
      element: <CategoriesComponent />,
    },
  ],
}

const LoginScreen: RouteObject = {
  path: '/login',
  element: (
    <RedirectIfLoggedIn redirectTo={Paths.setup.baseCurrency}>
      <LoginComponent />
    </RedirectIfLoggedIn>
  ),
}

const SignUpScreen: RouteObject = {
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
