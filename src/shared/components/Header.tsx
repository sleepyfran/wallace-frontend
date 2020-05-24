import React, { FunctionComponent } from 'react'
import { Flex } from 'theme-ui'

import User from '../../auth/components/User'
import Logo from './Logo'

export type HeaderProps = {
  showUserSection?: boolean
}

const HeaderComponent: FunctionComponent<HeaderProps> = ({
  showUserSection = true,
}) => {
  return (
    <Flex sx={{ px: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <Logo />
      {showUserSection ? <User /> : <></>}
    </Flex>
  )
}

export default HeaderComponent
