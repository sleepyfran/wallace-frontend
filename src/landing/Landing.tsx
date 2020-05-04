import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, Heading, Flex, Divider, Text } from 'theme-ui'

import { LoginScreen, CreateAccountScreen } from '../routes'
import SingleColumnLayout from '../shared/components/SingleColumnLayout'

const LandingComponent: FunctionComponent = () => {
  const history = useHistory()

  const handleSignInClick = () => {
    history.push(LoginScreen.path)
  }

  const handleCreateAccountClick = () => {
    history.push(CreateAccountScreen.path)
  }

  const handleExploreAsGuestClick = () => {
    alert('Coming soon :)')
  }

  return (
    <SingleColumnLayout
      showUserSectionInHeader={false}
      title="Create an account or sign in to manage your expenses"
    >
      <Button onClick={handleSignInClick} sx={{ mb: 1 }}>
        Sign In
      </Button>
      <Button onClick={handleCreateAccountClick} variant="outline">
        Create account
      </Button>
      <Divider sx={{ mt: 4 }} />
      <Text sx={{ textAlign: 'center', mt: 1 }}>
        Or{' '}
        <Button onClick={handleExploreAsGuestClick} variant="anchor">
          explore as guest
        </Button>
      </Text>
    </SingleColumnLayout>
  )
}

export default LandingComponent
