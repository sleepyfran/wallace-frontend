import React, { FunctionComponent } from 'react'
import { Button, Input, Label } from 'theme-ui'

import SingleColumnLayout from '../shared/components/SingleColumnLayout'

const LoginComponent: FunctionComponent = () => {
  return (
    <SingleColumnLayout showUserSectionInHeader={false} title="Welcome back!">
      <Label htmlFor="email">Email</Label>
      <Input name="email" />

      <Label htmlFor="password" sx={{ mt: 3 }}>
        Password
      </Label>
      <Input name="password" type="Password" />

      <Button sx={{ mt: 3 }}>Sign In</Button>
    </SingleColumnLayout>
  )
}

export default LoginComponent
