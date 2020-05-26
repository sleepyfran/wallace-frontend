import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'theme-ui'

import SingleColumnLayout from '../../shared/components/SingleColumnLayout'
import Stepper from '../../shared/components/Stepper'
import { StepperSteps } from '../shared/stepper/steps'

const BaseCurrencyComponent: FunctionComponent = () => {
  const { t } = useTranslation()

  return (
    <SingleColumnLayout childrenMargin={3} showUserSectionInHeader>
      <Stepper selectable={false} steps={StepperSteps(t)} />
      <Text>{t('setup.baseCurrency.hint')}</Text>
    </SingleColumnLayout>
  )
}

export default BaseCurrencyComponent
