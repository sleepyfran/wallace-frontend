import React, { FunctionComponent } from 'react'
import { Box } from 'theme-ui'

import Header from './Header'

type LayoutProps = {
  showUserSectionInHeader?: boolean
}

const LayoutComponent: FunctionComponent<LayoutProps> = ({
  showUserSectionInHeader,
  children,
}) => {
  return (
    <Box sx={{ p: 4 }}>
      <Header showUserSection={showUserSectionInHeader} />
      {children}
    </Box>
  )
}

export default LayoutComponent
