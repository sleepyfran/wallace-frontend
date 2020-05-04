import React, { FunctionComponent } from 'react'
import { Box, Button, Heading, Flex, Divider, Text } from 'theme-ui'

import Layout from '../shared/components/Layout'

const LandingComponent: FunctionComponent = () => {
  const onExploreAsGuest = () => {
    alert('Coming soon :)')
  }

  return (
    <Layout showUserSectionInHeader={false}>
      <Flex sx={{ flexDirection: 'column', alignItems: 'center', mt: 3 }}>
        <Heading>Create an account or sign in to manage your expenses</Heading>
        <Box sx={{ mt: 3, px: [1, 3, 4] }}>
          <Button sx={{ mb: 1 }}>Sign In</Button>
          <Button variant="outline">Create account</Button>
          <Divider sx={{ mt: 4 }} />
          <Text sx={{ textAlign: 'center', mt: 1 }}>
            Or{' '}
            <Button onClick={onExploreAsGuest} variant="anchor">
              explore as guest
            </Button>
          </Text>
        </Box>
      </Flex>
    </Layout>
  )
}

export default LandingComponent
