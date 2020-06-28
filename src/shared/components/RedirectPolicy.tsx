import { pipe } from 'fp-ts/lib/function'
import { Option, fold } from 'fp-ts/lib/Option'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { RootState } from '../store/rootReducer'
import { wrapFalsyMaybes } from '../utils'
import FullScreenLoading from './FullScreenLoading'

/**
 * Policy that, given the root state and the local router state returns the
 * URL that the component should redirect to. When the function returns Nothing
 * the component will not redirect.
 */
export type Policy<LocalState> = (
  rootState: RootState,
  localState: LocalState
) => Option<string>

type RedirectPolicyProps = {
  policy: Policy<any>
}

/**
 * Wraps a child component to redirect to another given URL based on a set of
 * policies. This is useful for components that have complex needs when it
 * comes to redirect to different places depending either on the root state
 * of Redux or the local state of the URL.
 */
const RedirectPolicy: FunctionComponent<RedirectPolicyProps> = ({
  children,
  policy,
}) => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const state = useSelector((s: RootState) => s)
  const localState = useLocation().state

  useEffect(() => {
    const maybeRedirect = policy(state, wrapFalsyMaybes(localState))
    setLoading(false)
    pipe(
      maybeRedirect,
      fold(() => {}, navigate)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{loading ? <FullScreenLoading /> : children}</>
}

export default RedirectPolicy
