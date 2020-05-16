import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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
        title={t('auth.signUp.title')}
      >
        <FormField
          label={t('auth.common.emailLabel')}
          name="email"
          onChange={handleChange}
          value={values.email}
        />
        <FormError message={errors.email} />

        <FormField
          label={t('auth.common.passwordLabel')}
          name="password"
          onChange={handleChange}
          type="Password"
          value={values.password}
        />
        <FormError message={errors.password} />

        <FormField
          label={t('auth.common.repeatPassword')}
          name="repeatPassword"
          onChange={handleChange}
          type="Password"
          value={values.repeatPassword}
        />
        <FormError message={errors.repeatPassword} />

        <FormError message={errors.general} />

        <Button>{t('auth.signUp.createAccount')}</Button>

        <Divider />

        <Text>
          {`${t('auth.signUp.alternative.title')} `}
          <Link href={LoginScreen.path}>
            {t('auth.signUp.alternative.link')}
          </Link>
        </Text>
      </SingleColumnLayout>
    </Box>
  )
}

export default SignUpComponent
