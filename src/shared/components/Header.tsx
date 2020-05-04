import React, { FunctionComponent } from 'react'
import { Flex } from 'theme-ui'

import Logo from './Logo'
import User from './User'

export type HeaderProps = {
  showUserSection?: boolean
}

const HeaderComponent: FunctionComponent<HeaderProps> = ({
  showUserSection = true,
}) => {
  return (
    <Flex sx={{ px: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <Logo />
      {showUserSection ? <User user={undefined} /> : <></>}
    </Flex>
  )
}

export default HeaderComponent
