import { useMachine } from '@xstate/react'
import { Nothing } from 'purify-ts'
import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { Text, Flex, Card } from 'theme-ui'

import LoadingButton from '../../shared/components/LoadingButton'
import { createApiMachine } from '../../shared/machines/api.machine'
import { submitUserPreferences } from '../shared/api/setup.api'
import { UserPreferences, CategorySelectionType } from '../shared/model/model'

const CategoriesComponent: FunctionComponent = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const userPreference = location.state as UserPreferences
  const [selectedCategoriesPreference, setCategoriesPreference] = useState(
    userPreference.categoriesSelection
  )
  const [current, send] = useMachine(
    createApiMachine().withContext({
      apiCall: () =>
        submitUserPreferences({
          account: userPreference.account.unsafeCoerce(),
          baseCurrency: userPreference.baseCurrency.unsafeCoerce(),
          categoriesSelection: selectedCategoriesPreference,
        }),
      error: Nothing,
    })
  )

  const SelectionCard: FunctionComponent<{
    selectionType: CategorySelectionType
    label: string
  }> = ({ label: name, selectionType }) => (
    <Card
      onClick={() => setCategoriesPreference(selectionType)}
      sx={{
        mx: 1,
        height: '200px',
      }}
      variant={
        selectionType === selectedCategoriesPreference ? 'selected' : 'primary'
      }
    >
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Text>{name}</Text>
      </Flex>
    </Card>
  )

  return (
    <>
      <Text>{t('setup.categories.hint')}</Text>

      <Flex sx={{ justifyContent: 'center' }}>
        <SelectionCard
          label={t('setup.categories.predefinedCategoriesLabel')}
          selectionType={CategorySelectionType.predefined}
        />
        <SelectionCard
          label={t('setup.categories.emptyCategoriesLabel')}
          selectionType={CategorySelectionType.empty}
        />
      </Flex>

      {current.matches('waiting.error') ? (
        <Text>{t('setup.common.apiError')}</Text>
      ) : (
        <></>
      )}

      <LoadingButton
        loading={current.matches('loading')}
        onClick={() => send('CALL')}
      >
        {t('setup.categories.buttonLabel')}
      </LoadingButton>
    </>
  )
}

export default CategoriesComponent
