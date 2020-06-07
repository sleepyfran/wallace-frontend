import React, { FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RootState } from '../store/rootReducer'
import FullScreenLoading from './FullScreenLoading'

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
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const state = useSelector((s: RootState) => s)

  useEffect(() => {
    setLoading(false)
    if (condition(state)) navigate(redirectUrl)
  }, [condition, navigate, state, redirectUrl])

  return <>{loading ? <FullScreenLoading /> : children}</>
}

export default RedirectIf
