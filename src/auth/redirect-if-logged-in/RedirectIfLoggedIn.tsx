import React, { FunctionComponent } from 'react'

import { Route } from '../../routes'
import RedirectIf from '../../shared/components/RedirectIf'

type RedirectIfLoggedInProps = {
  redirectTo: Route
}

/**
 * Wraps a child component to redirect to an specific Route if the user is
 * already logged in.
 */
const RedirectIfLoggedIn: FunctionComponent<RedirectIfLoggedInProps> = ({
  children,
  redirectTo,
}) => (
  <RedirectIf
    condition={state => state.auth.loggedInUser.isJust()}
    redirectUrl={redirectTo.path}
  >
    {children}
  </RedirectIf>
)

export default RedirectIfLoggedIn
