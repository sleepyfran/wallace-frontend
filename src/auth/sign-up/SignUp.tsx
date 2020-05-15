import { useMachine } from '@xstate/react'
import React, {
  FunctionComponent,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react'
import { useDispatch } from 'react-redux'
import { Link, Button, Field, Divider, Text, Box } from 'theme-ui'
import validation from 'validum'

import { LoginScreen } from '../../routes'
import FormError from '../../shared/components/FormError'
import SingleColumnLayout from '../../shared/components/SingleColumnLayout'
import { createFormMachine } from '../../shared/machines/form.machine'
import { errorsFromResult } from '../../shared/utils'
import { signUp } from '../shared/api/auth.api'
import { UserSignUp } from '../shared/model/model'
import { setUser } from '../shared/store/auth.store'
import handleSignUpErrors from './signup.errorHandler'

const SignUpComponent: FunctionComponent = () => {
  const dispatch = useDispatch()

  const [current, send] = useMachine(
    createFormMachine<UserSignUp, keyof UserSignUp>().withContext({
      values: {},
      errors: {},
      submit: input => {
        const result = validation
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
          .result()

        if (result.hasErrors()) return Promise.reject(errorsFromResult(result))

        return signUp(input)
          .then(response => dispatch(setUser(response.data)))
          .catch(handleSignUpErrors)
      },
    })
  )

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      send('CHANGE', { key: event.target.name, value: event.target.value })
    },
    [send]
  )

  const handleSignUp = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      send('SUBMIT')
    },
    [send]
  )

  const { values, errors } = current.context

  return (
    <Box as="form" onSubmit={handleSignUp}>
      <SingleColumnLayout
        childrenMargin={3}
        showUserSectionInHeader={false}
        title="We're glad to see you here!"
      >
        <Field<'input'>
          label="Email"
          name="email"
          onChange={handleChange}
          value={values.email}
        />
        <FormError message={errors.email} />

        <Field<'input'>
          label="Password"
          name="password"
          onChange={handleChange}
          type="Password"
          value={values.password}
        />
        <FormError message={errors.password} />

        <Field<'input'>
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
