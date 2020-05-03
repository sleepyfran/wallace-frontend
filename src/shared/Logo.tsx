import React, { FunctionComponent } from 'react'
import { Heading, Text } from 'theme-ui'

const Logo: FunctionComponent = () => (
  <Heading sx={{ cursor: 'default', userSelect: 'none' }} variant="logo.main">
    wal
    <Text as="span" variant="logo.bigLetter">
      l
    </Text>
    ace
  </Heading>
)

export default Logo
