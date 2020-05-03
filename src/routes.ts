import { FunctionComponent } from 'react'

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

/**
 * Routes of the app.
 */
export default [LandingScreen]
