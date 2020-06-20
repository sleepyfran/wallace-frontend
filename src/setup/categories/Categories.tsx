import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { Text, Flex, Button, Card } from 'theme-ui'

import { UserPreference, CategorySelectionType } from '../shared/model/model'

const CategoriesComponent: FunctionComponent = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const userPreference = location.state as UserPreference
  const [selectedCategoriesPreference, setCategoriesPreference] = useState(
    userPreference.categoriesSelection
  )

  const onFinishSetupClicked = () => {
    alert('You made it! Now wait until the rest of the app is ready :)')
  }

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

      <Button onClick={onFinishSetupClicked}>
        {t('setup.categories.buttonLabel')}
      </Button>
    </>
  )
}

export default CategoriesComponent
