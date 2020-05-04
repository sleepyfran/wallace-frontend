import { FunctionComponent } from 'react'

import CreateAccountComponent from './create-account/CreateAccount'
import LandingComponent from './landing/Landing'
import LoginComponent from './login/Login'

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

export const CreateAccountScreen: Route = {
  id: 2,
  name: 'CreateAccount',
  path: '/create-account',
  exact: true,
  component: CreateAccountComponent,
}

/**
 * Routes of the app.
 */
export default [LandingScreen, LoginScreen, CreateAccountScreen]
