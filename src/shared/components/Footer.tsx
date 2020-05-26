import React, { FunctionComponent } from 'react'
import { Box, Link } from 'theme-ui'

const FooterComponent: FunctionComponent = () => (
  <Box sx={{ '& > :not(:first-child)': { ml: 3 } }}>
    <Link href="https://github.com/wallaceapp" target="_blank">
      source code
    </Link>
    <Link href="https://headwayapp.co/wallace-changelog" target="_blank">
      changelog
    </Link>
  </Box>
)

export default FooterComponent
