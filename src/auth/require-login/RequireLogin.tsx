import { isNone } from 'fp-ts/lib/Option'
import React, { FunctionComponent } from 'react'

import { Paths } from '../../routes'
import RedirectIf from '../../shared/components/RedirectIf'

/**
 * Wraps a child component to protect the resources inside of it. Checks whether
 * the user is logged in and, if so, shows the children; otherwise redirects
 * to the landing screen.
 */
const RequireLogin: FunctionComponent = ({ children }) => (
  <RedirectIf
    condition={state => isNone(state.auth.loggedInUser)}
    redirectUrl={Paths.landing}
  >
    {children}
  </RedirectIf>
)

export default RequireLogin
