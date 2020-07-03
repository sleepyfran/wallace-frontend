import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Divider, Text } from 'theme-ui'

import { Paths } from '../routes'
import SingleColumnLayout from '../shared/components/SingleColumnLayout'

const LandingComponent: FunctionComponent = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSignInClick = () => {
    navigate(Paths.login)
  }

  const handleSignUpClick = () => {
    navigate(Paths.signUp)
  }

  const handleExploreAsGuestClick = () => {
    alert('Coming soon :)')
  }

  return (
    <SingleColumnLayout
      showNavigationInHeader={false}
      showUserSectionInHeader={false}
      title={t('landing.title')}
    >
      <Button onClick={handleSignInClick} sx={{ mb: 1 }}>
        {t('auth.login.signIn')}
      </Button>
      <Button onClick={handleSignUpClick} variant="outline">
        {t('auth.signUp.createAccount')}
      </Button>
      <Divider sx={{ mt: 4 }} />
      <Text sx={{ textAlign: 'center', mt: 1 }}>
        {`${t('landing.or')} `}
        <Button onClick={handleExploreAsGuestClick} variant="anchor">
          {t('landing.exploreAsGuest')}
        </Button>
      </Text>
    </SingleColumnLayout>
  )
}

export default LandingComponent
