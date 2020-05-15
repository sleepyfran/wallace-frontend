import React, { FunctionComponent } from 'react'
import { Link, Button, Field, Divider, Text } from 'theme-ui'

import { LoginScreen } from '../../routes'
import SingleColumnLayout from '../../shared/components/SingleColumnLayout'

const SignUpComponent: FunctionComponent = () => {
  return (
    <SingleColumnLayout
      childrenMargin={3}
      showUserSectionInHeader={false}
      title="We're glad to see you here!"
    >
      <Field label="Email" name="email" />
      <Field<'input'> label="Password" name="password" type="Password" />
      <Field<'input'>
        label="Repeat password"
        name="passwordRepeat"
        type="Password"
      />

      <Button>Create account</Button>

      <Divider />

      <Text>
        Already have an account?{' '}
        <Link href={LoginScreen.path}>Sign in instead</Link>
      </Text>
    </SingleColumnLayout>
  )
}

export default SignUpComponent
