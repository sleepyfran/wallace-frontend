import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link, Button, Box, Divider, Text } from 'theme-ui'
import validation from 'validum'

import { SignUpScreen, SetupBaseCurrencyScreen } from '../../routes'
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
  const { t } = useTranslation()
  const history = useHistory()

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
        .withMessage(t('auth.common.errors.emailEmpty'))
        .andProperty('password')
        .minLength(7)
        .withMessage(t('auth.common.errors.passwordLength'))
        .result(),
    submit: input =>
      login(input)
        .then(response => {
          dispatch(setUser(response.data))
          history.push(SetupBaseCurrencyScreen.path)
        })
        .catch(handleLoginErrors),
  })

  const { values, errors } = current.context

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <SingleColumnLayout
        childrenMargin={3}
        showUserSectionInHeader={false}
        title={t('auth.login.title')}
      >
        <FormField
          label={t('auth.common.emailLabel')}
          name="email"
          onChange={handleChange}
          value={values.email || ''}
        />
        <FormError message={errors.email} />

        <FormField
          label={t('auth.common.passwordLabel')}
          name="password"
          onChange={handleChange}
          type="password"
          value={values.password || ''}
        />
        <FormError message={errors.password} />

        <FormError message={errors.general} />

        <Button>{t('auth.login.signIn')}</Button>

        <Divider />

        <Text>
          {`${t('auth.login.alternative.title')} `}
          <Link href={SignUpScreen.path}>
            {t('auth.login.alternative.link')}
          </Link>
        </Text>
      </SingleColumnLayout>
    </Box>
  )
}

export default LoginComponent
