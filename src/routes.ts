import { FunctionComponent } from 'react'

import LoginComponent from './auth/login/Login'
import SignUpComponent from './auth/sign-up/SignUp'
import LandingComponent from './landing/Landing'

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

/**
 * Routes of the app.
 */
export default [LandingScreen, LoginScreen, SignUpScreen]
