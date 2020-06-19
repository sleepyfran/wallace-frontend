import { isNumber } from 'lodash'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { of } from 'rxjs'
import { Box, Button, Text } from 'theme-ui'
import validation from 'validum'

import FormError from '../../shared/components/FormError'
import FormField from '../../shared/components/FormField'
import Select from '../../shared/components/Select'
import { useForm } from '../../shared/hooks/useForm'
import { withMarginInAllButFirstChild } from '../../shared/utils'
import {
  FirstAccount,
  AccountType,
  AccountTypesSelect,
} from '../shared/model/model'

const FirstAccountComponent: FunctionComponent = () => {
  const { t } = useTranslation()

  const {
    machine: [current],
    handleChange,
    handleSubmit,
  } = useForm<FirstAccount>({
    values: {},
    errors: {},
    validate: input =>
      validation
        .of(input)
        .property('name')
        .notEmpty()
        .withMessage(t('setup.firstAccount.errors.nameEmpty'))
        .andProperty('initialBalance')
        .fulfills(
          fi =>
            isNumber(Number(fi.initialBalance)) && Number(fi.initialBalance) > 0
        )
        .withMessage(t('setup.firstAccount.errors.initialBalanceNegative'))
        .andProperty('type')
        .truthy()
        .withMessage(t('setup.firstAccount.errors.typeEmpty'))
        .result(),
    submit: input => of(console.log(input)),
  })

  const { values, errors } = current.context

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      sx={{ ...withMarginInAllButFirstChild('mt', 3) }}
    >
      <Text>{t('setup.firstAccount.hint')}</Text>

      <FormField
        label={t('setup.firstAccount.nameLabel')}
        name="name"
        onChange={handleChange}
        value={values.name}
      />
      <FormError message={errors.name} />

      <FormField
        label={t('setup.firstAccount.initialBalanceLabel')}
        name="initialBalance"
        onChange={handleChange}
        type="number"
        value={values.initialBalance}
      />
      <FormError message={errors.initialBalance} />

      <Select
        label={t('setup.firstAccount.typeLabel')}
        name="type"
        onChange={handleChange}
        options={AccountTypesSelect}
        selected={AccountType[AccountType.checking]}
      />
      <FormError message={errors.type} />

      <FormError message={errors.general} />

      <Button variant="outline">{t('common.nextStep')}</Button>
    </Box>
  )
}

export default FirstAccountComponent
