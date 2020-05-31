import React, { FunctionComponent } from 'react'

import { LandingScreen } from '../../routes'
import RedirectIf from '../../shared/components/RedirectIf'

/**
 * Wraps a child component to protect the resources inside of it. Checks whether
 * the user is logged in and, if so, shows the children; otherwise redirects
 * to the landing screen.
 */
const RequireLogin: FunctionComponent = ({ children }) => (
  <RedirectIf
    condition={state => state.auth.loggedInUser.isNothing()}
    redirectUrl={LandingScreen.path}
  >
    {children}
  </RedirectIf>
)

export default RequireLogin
