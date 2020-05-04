import React, { FunctionComponent } from 'react'
import { Button, Field } from 'theme-ui'

import SingleColumnLayout from '../shared/components/SingleColumnLayout'

const LoginComponent: FunctionComponent = () => {
  return (
    <SingleColumnLayout
      childrenMargin={3}
      showUserSectionInHeader={false}
      title="Welcome back!"
    >
      <Field label="Email" name="email" />
      <Field<'input'> label="Password" name="password" type="Password" />

      <Button>Sign In</Button>
    </SingleColumnLayout>
  )
}

export default LoginComponent
