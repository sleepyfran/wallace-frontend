import React, { FunctionComponent } from 'react'
import { Box, Flex } from 'theme-ui'

import Footer from './Footer'
import Header from './Header'

export type LayoutProps = {
  showUserSectionInHeader?: boolean
  showNavigationInHeader?: boolean
}

const LayoutComponent: FunctionComponent<LayoutProps> = ({
  showUserSectionInHeader,
  showNavigationInHeader,
  children,
}) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        minHeight: '100vh',
        py: 3,
        px: [3, 4, 4, 6, 8],
      }}
    >
      <Header
        showNavigation={showNavigationInHeader}
        showUserSection={showUserSectionInHeader}
      />
      <Box sx={{ flex: 1 }}>{children}</Box>
      <Footer />
    </Flex>
  )
}

export default LayoutComponent
