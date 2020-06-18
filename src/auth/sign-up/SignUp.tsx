import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { tap, catchError } from 'rxjs/operators'
import { Link, Divider, Text, Box } from 'theme-ui'
import validation from 'validum'

import { Paths } from '../../routes'
import FormError from '../../shared/components/FormError'
import FormField from '../../shared/components/FormField'
import LoadingButton from '../../shared/components/LoadingButton'
import SingleColumnLayout from '../../shared/components/SingleColumnLayout'
import { useForm } from '../../shared/hooks/useForm'
import { signUp } from '../shared/api/auth.api'
import { UserSignUp } from '../shared/model/model'
import { setUser } from '../shared/store/auth.store'
import handleSignUpErrors from './signup.errorHandler'

const SignUpComponent: FunctionComponent = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

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
        .property('name')
        .notEmpty()
        .withMessage(t('auth.signUp.errors.nameEmpty'))
        .andProperty('email')
        .notEmpty()
        .withMessage(t('auth.common.errors.emailEmpty'))
        .andProperty('password')
        .minLength(7)
        .withMessage(t('auth.common.errors.passwordLength'))
        .andProperty('repeatPassword')
        .fulfills(us => us.password === us.repeatPassword)
        .withMessage(t('auth.signUp.errors.passwordsDoNotMatch'))
        .result(),
    submit: input =>
      signUp(input).pipe(
        tap(response => dispatch(setUser(response.data))),
        tap(() => navigate(Paths.setup.baseCurrency)),
        catchError(handleSignUpErrors)
      ),
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
          label={t('auth.signUp.nameLabel')}
          name="name"
          onChange={handleChange}
          value={values.name}
        />
        <FormError message={errors.name} />

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

        <LoadingButton loading={current.matches('submitting')}>
          {t('auth.signUp.createAccount')}
        </LoadingButton>

        <Divider />

        <Text>
          {`${t('auth.signUp.alternative.title')} `}
          <Link href={Paths.login}>{t('auth.signUp.alternative.link')}</Link>
        </Text>
      </SingleColumnLayout>
    </Box>
  )
}

export default SignUpComponent
