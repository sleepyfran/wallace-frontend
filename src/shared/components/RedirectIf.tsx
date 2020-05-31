import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { RootState } from '../store/rootReducer'

type RedirectIfProps = {
  condition: (state: RootState) => boolean
  redirectUrl: string
}

/**
 * Wraps a child component to redirect to another given URL if a certain
 * condition is met.
 */
const RedirectIf: FunctionComponent<RedirectIfProps> = ({
  children,
  condition,
  redirectUrl,
}) => {
  const history = useHistory()
  const state = useSelector((s: RootState) => s)

  if (condition(state)) history.replace(redirectUrl)

  return <>{children}</>
}

export default RedirectIf
