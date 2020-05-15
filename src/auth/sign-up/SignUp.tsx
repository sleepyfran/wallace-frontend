import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Button, Divider, Text, Box } from 'theme-ui'
import validation from 'validum'

import { LoginScreen } from '../../routes'
import FormError from '../../shared/components/FormError'
import FormField from '../../shared/components/FormField'
import SingleColumnLayout from '../../shared/components/SingleColumnLayout'
import { useForm } from '../../shared/hooks/useForm'
import { signUp } from '../shared/api/auth.api'
import { UserSignUp } from '../shared/model/model'
import { setUser } from '../shared/store/auth.store'
import handleSignUpErrors from './signup.errorHandler'

const SignUpComponent: FunctionComponent = () => {
  const dispatch = useDispatch()

  const {
    machine: [current],
    handleChange,
    handleSubmit,
  } = useForm<UserSignUp>({
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
        .andProperty('repeatPassword')
        .fulfills(us => us.password === us.repeatPassword)
        .withMessage('The passwords must match!')
        .result(),
    submit: input =>
      signUp(input)
        .then(response => dispatch(setUser(response.data)))
        .catch(handleSignUpErrors),
  })

  const { values, errors } = current.context

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <SingleColumnLayout
        childrenMargin={3}
        showUserSectionInHeader={false}
        title="We're glad to see you here!"
      >
        <FormField
          label="Email"
          name="email"
          onChange={handleChange}
          value={values.email}
        />
        <FormError message={errors.email} />

        <FormField
          label="Password"
          name="password"
          onChange={handleChange}
          type="Password"
          value={values.password}
        />
        <FormError message={errors.password} />

        <FormField
          label="Repeat password"
          name="repeatPassword"
          onChange={handleChange}
          type="Password"
          value={values.repeatPassword}
        />
        <FormError message={errors.repeatPassword} />

        <FormError message={errors.general} />

        <Button>Create account</Button>

        <Divider />

        <Text>
          Already have an account?{' '}
          <Link href={LoginScreen.path}>Sign in instead</Link>
        </Text>
      </SingleColumnLayout>
    </Box>
  )
}

export default SignUpComponent
