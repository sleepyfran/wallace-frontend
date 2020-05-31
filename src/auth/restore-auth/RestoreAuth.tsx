import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

import { retrieveFromStorage } from '../../shared/storage/storage'
import { setUser } from '../shared/store/auth.store'

/**
 * Wraps an application and automatically retrieves the auth information from
 * the localStorage onto Redux if it exists.
 */
const RestoreAuth: FunctionComponent = ({ children }) => {
  const dispatch = useDispatch()
  const maybeUser = retrieveFromStorage('user')

  maybeUser.caseOf({
    Just: user => dispatch(setUser(user)),
    Nothing: () => {},
  })

  return <>{children}</>
}

export default RestoreAuth
