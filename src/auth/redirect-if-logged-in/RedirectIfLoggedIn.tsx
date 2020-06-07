import React, { FunctionComponent } from 'react'

import RedirectIf from '../../shared/components/RedirectIf'

type RedirectIfLoggedInProps = {
  redirectTo: string
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
    redirectUrl={redirectTo}
  >
    {children}
  </RedirectIf>
)

export default RedirectIfLoggedIn
