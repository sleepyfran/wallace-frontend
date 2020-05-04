import React, { FunctionComponent } from 'react'
import { Button, Input, Label } from 'theme-ui'

import SingleColumnLayout from '../shared/components/SingleColumnLayout'

const CreateAccountComponent: FunctionComponent = () => {
  return (
    <SingleColumnLayout
      showUserSectionInHeader={false}
      title="We're glad to see you here!"
    >
      <Label htmlFor="email">Email</Label>
      <Input name="email" />

      <Label htmlFor="password" sx={{ mt: 3 }}>
        Password
      </Label>
      <Input name="password" type="Password" />

      <Label htmlFor="passwordRepeat" sx={{ mt: 3 }}>
        Repeat password
      </Label>
      <Input name="passwordRepeat" type="Password" />

      <Button sx={{ mt: 3 }}>Create account</Button>
    </SingleColumnLayout>
  )
}

export default CreateAccountComponent
