import React from 'react'
import { PartialRouteObject as RouteObject } from 'react-router'

import LoginComponent from './auth/login/Login'
import RedirectIfLoggedIn from './auth/redirect-if-logged-in/RedirectIfLoggedIn'
import RequireLogin from './auth/require-login/RequireLogin'
import SignUpComponent from './auth/sign-up/SignUp'
import Dashboard from './dashboard/Dashboard'
import LandingComponent from './landing/Landing'
import BaseCurrencyComponent from './setup/base-currency/BaseCurrency'
import CategoriesComponent from './setup/categories/Categories'
import FirstAccountComponent from './setup/first-account/FirstAccount'
import SetupComponent from './setup/Setup'
import SetupRedirectPolicy from './setup/shared/redirect-policy'
import RedirectPolicy from './shared/components/RedirectPolicy'

type Route = {
  name: string
  showInNavigation?: boolean
  children?: Route[]
  path: string
} & RouteObject

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

const LandingScreen: Route = {
  name: 'Home',
  path: '/',
  element: <LandingComponent />,
}

const SetupScreen: Route = {
  name: 'Setup',
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
      name: 'Base Currency',
      path: 'base-currency',
      element: <BaseCurrencyComponent />,
    },
    {
      name: 'First Account',
      path: 'first-account',
      element: <FirstAccountComponent />,
    },
    {
      name: 'Categories',
      path: 'categories',
      element: <CategoriesComponent />,
    },
  ],
}

const LoginScreen: Route = {
  name: 'Login',
  path: '/login',
  element: (
    <RedirectIfLoggedIn redirectTo={Paths.setup.baseCurrency}>
      <LoginComponent />
    </RedirectIfLoggedIn>
  ),
}

const SignUpScreen: Route = {
  name: 'Sign Up',
  path: '/sign-up',
  element: (
    <RedirectIfLoggedIn redirectTo={Paths.setup.firstAccount}>
      <SignUpComponent />
    </RedirectIfLoggedIn>
  ),
}

const DashboardScreen: Route = {
  name: 'Dashboard',
  path: '/dashboard',
  showInNavigation: true,
  element: (
    <RequireLogin>
      <Dashboard />
    </RequireLogin>
  ),
}

const TestScreen: Route = {
  name: 'Test',
  path: '/test',
  showInNavigation: true,
  element: (
    <RequireLogin>
      <Dashboard />
    </RequireLogin>
  ),
}

const SecondTestScreen: Route = {
  name: 'Second Test',
  path: '/second-test',
  showInNavigation: true,
  element: (
    <RequireLogin>
      <Dashboard />
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
  SetupScreen,
  DashboardScreen,
  TestScreen,
  SecondTestScreen,
]
