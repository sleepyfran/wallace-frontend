import React, { FunctionComponent, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { tap, flatMap, finalize } from 'rxjs/operators'

import FullScreenLoading from '../../shared/components/FullScreenLoading'
import { retrieveFromStorage } from '../../shared/storage/storage'
import { maybeToObservable } from '../../shared/utils'
import { refreshTokenIfNeeded } from '../shared/auth'
import { setUser } from '../shared/store/auth.store'

/**
 * Wraps an application and automatically retrieves the auth information from
 * the localStorage onto Redux if it exists.
 */
const RestoreAuth: FunctionComponent = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const maybeUser = retrieveFromStorage('user')

  useEffect(() => {
    maybeToObservable(maybeUser)
      .pipe(
        flatMap(refreshTokenIfNeeded),
        tap(u => dispatch(setUser(u))),
        finalize(() => setLoading(false))
      )
      .subscribe()
  }, [dispatch, maybeUser])

  return <>{loading ? <FullScreenLoading /> : children}</>
}

export default RestoreAuth
