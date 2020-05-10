import { useMachine } from '@xstate/react'
import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useCallback,
} from 'react'
import { useDispatch } from 'react-redux'
import { Button, Field, Box, Label } from 'theme-ui'
import validation from 'validum'

import SingleColumnLayout from '../../shared/components/SingleColumnLayout'
import { createFormMachine } from '../../shared/machines/form.machine'
import { Dispatch } from '../../shared/store/types'
import { errorsFromResult } from '../../shared/utils'
import { login } from '../shared/api/auth.api'
import { UserLogin } from '../shared/model/model'
import { setUser } from '../shared/store/auth.store'
import handleLoginErrors from './login.errorHandler'

const LoginComponent: FunctionComponent = () => {
  const dispatch: Dispatch = useDispatch()

  const [current, send] = useMachine(
    createFormMachine<UserLogin, keyof UserLogin>().withContext({
      values: {},
      errors: {},
      submit: input => {
        const result = validation
          .of(input)
          .property('email')
          .notEmpty()
          .andProperty('password')
          .minLength(7)
          .result()

        if (result.hasErrors()) return Promise.reject(errorsFromResult(result))

        return login(input)
          .then(response => dispatch(setUser(response.data)))
          .catch(handleLoginErrors)
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

  const handleLogin = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      send('SUBMIT')
    },
    [send]
  )

  const { values, errors } = current.context

  return (
    <Box as="form" onSubmit={handleLogin}>
      <SingleColumnLayout
        childrenMargin={3}
        showUserSectionInHeader={false}
        title="Welcome back!"
      >
        <Field<'input'>
          label="Email"
          name="email"
          onChange={handleChange}
          value={values.email || ''}
        />
        {errors.email ? <Label variant="error">{errors.email}</Label> : <></>}
        <Field<'input'>
          label="Password"
          name="password"
          onChange={handleChange}
          type="Password"
          value={values.password || ''}
        />
        {errors.password ? (
          <Label variant="error">{errors.password}</Label>
        ) : (
          <></>
        )}

        {errors.general ? (
          <Label variant="error">{errors.general}</Label>
        ) : (
          <></>
        )}

        <Button>Sign In</Button>
      </SingleColumnLayout>
    </Box>
  )
}

export default LoginComponent
