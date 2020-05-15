import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Button, Box, Divider, Text } from 'theme-ui'
import validation from 'validum'

import { SignUpScreen } from '../../routes'
import FormError from '../../shared/components/FormError'
import FormField from '../../shared/components/FormField'
import SingleColumnLayout from '../../shared/components/SingleColumnLayout'
import { useForm } from '../../shared/hooks/useForm'
import { Dispatch } from '../../shared/store/types'
import { login } from '../shared/api/auth.api'
import { UserLogin } from '../shared/model/model'
import { setUser } from '../shared/store/auth.store'
import handleLoginErrors from './login.errorHandler'

const LoginComponent: FunctionComponent = () => {
  const dispatch: Dispatch = useDispatch()

  const {
    machine: [current],
    handleChange,
    handleSubmit,
  } = useForm<UserLogin>({
    values: {},
    errors: {},
    validate: input =>
      validation
        .of(input)
        .property('email')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .andProperty('password')
        .minLength(7)
        .withMessage('Password has to be at least 7 characters long')
        .result(),
    submit: input =>
      login(input)
        .then(response => dispatch(setUser(response.data)))
        .catch(handleLoginErrors),
  })

  const { values, errors } = current.context

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <SingleColumnLayout
        childrenMargin={3}
        showUserSectionInHeader={false}
        title="Welcome back!"
      >
        <FormField
          label="Email"
          name="email"
          onChange={handleChange}
          value={values.email || ''}
        />
        <FormError message={errors.email} />

        <FormField
          label="Password"
          name="password"
          onChange={handleChange}
          type="Password"
          value={values.password || ''}
        />
        <FormError message={errors.password} />

        <FormError message={errors.general} />

        <Button>Sign In</Button>

        <Divider />

        <Text>
          Don&apos;t have an account yet?{' '}
          <Link href={SignUpScreen.path}>Create an account instead</Link>
        </Text>
      </SingleColumnLayout>
    </Box>
  )
}

export default LoginComponent
