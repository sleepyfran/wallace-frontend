import React, { FunctionComponent } from 'react'
import { Box, Flex } from 'theme-ui'

import Footer from './Footer'
import Header from './Header'

export type LayoutProps = {
  showUserSectionInHeader?: boolean
}

const LayoutComponent: FunctionComponent<LayoutProps> = ({
  showUserSectionInHeader,
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
      <Header showUserSection={showUserSectionInHeader} />
      <Box sx={{ flex: 1 }}>{children}</Box>
      <Footer />
    </Flex>
  )
}

export default LayoutComponent
