import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { LandingScreen } from '../../routes'
import { RootState } from '../../shared/store/rootReducer'

/**
 * Wraps a child component to protect the resources inside of it. Checks whether
 * the user is logged in and, if so, shows the children; otherwise redirects
 * to the landing screen.
 */
const RequireLogin: FunctionComponent = ({ children }) => {
  const history = useHistory()
  const maybeUser = useSelector((state: RootState) => state.auth.loggedInUser)

  if (maybeUser.isNothing()) history.replace(LandingScreen.path)

  return <>{children}</>
}

export default RequireLogin
