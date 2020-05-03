import React, { FunctionComponent } from 'react'
import { Box, Button } from 'rebass'

import Logo from '../shared/Logo'

const LandingComponent: FunctionComponent = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Logo />
      <Button sx={{ mr: 2 }}>Test</Button>
      <Button variant="outline">Test</Button>
    </Box>
  )
}

export default LandingComponent
