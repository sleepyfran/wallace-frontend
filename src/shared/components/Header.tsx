import React, { FunctionComponent } from 'react'
import { Flex } from 'theme-ui'

import User from '../../auth/components/User'
import Logo from './Logo'
import Navigation from './Navigation'

export type HeaderProps = {
  showNavigation?: boolean
  showUserSection?: boolean
}

const HeaderComponent: FunctionComponent<HeaderProps> = ({
  showNavigation = true,
  showUserSection = true,
}) => {
  return (
    <Flex sx={{ px: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <Logo />
      {showNavigation ? <Navigation /> : <></>}
      {showUserSection ? <User /> : <></>}
    </Flex>
  )
}

export default HeaderComponent
