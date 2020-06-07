import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'theme-ui'

import SingleColumnLayout from '../../shared/components/SingleColumnLayout'
import Stepper from '../../shared/components/Stepper'
import { StepperSteps } from '../shared/stepper/steps'

const FirstAccountComponent: FunctionComponent = () => {
  const { t } = useTranslation()

  return (
    <SingleColumnLayout childrenMargin={3} showUserSectionInHeader>
      <Stepper selectable={false} steps={StepperSteps(t)} />

      <Button disabled onClick={() => {}} variant="outline">
        {t('common.nextStep')}
      </Button>
    </SingleColumnLayout>
  )
}

export default FirstAccountComponent
