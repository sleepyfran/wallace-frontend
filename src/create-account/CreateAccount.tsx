import React, { FunctionComponent } from 'react'
import { Button, Field } from 'theme-ui'

import SingleColumnLayout from '../shared/components/SingleColumnLayout'

const CreateAccountComponent: FunctionComponent = () => {
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
    </SingleColumnLayout>
  )
}

export default CreateAccountComponent
