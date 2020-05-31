import React, { FunctionComponent } from 'react'
import { Button, ButtonProps, Spinner } from 'theme-ui'

type LoadingButtonProps = {
  loading?: boolean
} & ButtonProps

const LoadingButton: FunctionComponent<LoadingButtonProps> = props => {
  const { loading, children } = props

  return (
    <Button {...(props as any)}>
      {loading ? <Spinner size="18" /> : children}
    </Button>
  )
}

export default LoadingButton
