import React, { FunctionComponent, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Spinner } from 'theme-ui'

import { retrieveFromStorage } from '../../shared/storage/storage'
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
    maybeUser.caseOf({
      Just: user => {
        refreshTokenIfNeeded(user)
          .then(mu =>
            mu.caseOf({
              Just: u => dispatch(setUser(u)),
              Nothing: () => {},
            })
          )
          .finally(() => setLoading(false))
      },
      Nothing: () => setLoading(false),
    })
  }, [dispatch, maybeUser])

  return (
    <>
      {loading ? (
        <Flex
          sx={{
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <Spinner />
        </Flex>
      ) : (
        children
      )}
    </>
  )
}

export default RestoreAuth
