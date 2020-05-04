import React, { FunctionComponent } from 'react'
import { Box, Button, Heading, Flex, Divider, Text, Link } from 'theme-ui'

import Logo from '../shared/Logo'

const LandingComponent: FunctionComponent = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Logo />
      <Flex sx={{ flexDirection: 'column', alignItems: 'center', mt: 3 }}>
        <Heading>Create an account or sign in to manage your expenses</Heading>
        <Box sx={{ mt: 3, px: [1, 3, 4] }}>
          <Button sx={{ width: '100%', mb: 1 }}>Sign In</Button>
          <Button sx={{ width: '100%' }} variant="outline">
            Create account
          </Button>
          <Divider sx={{ mt: 4 }} />
          <Text sx={{ mt: 1 }}>
            Or <Link href="https://google.es">explore as guest</Link>
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default LandingComponent
