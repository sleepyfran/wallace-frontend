import React, { FunctionComponent, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'

import { Paths } from '../routes'
import SingleColumnLayout from '../shared/components/SingleColumnLayout'
import Stepper from '../shared/components/UrlStepper'
import { useEmptyPathname } from '../shared/hooks/useEmptyRoute'
import { StepperSteps } from './shared/stepper/steps'

const BaseCurrencyComponent: FunctionComponent = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const shouldRedirectToChild = useEmptyPathname(Paths.setup.base)

  useEffect(() => {
    if (shouldRedirectToChild) navigate(Paths.setup.baseCurrency)
  })

  return (
    <SingleColumnLayout
      childrenMargin={3}
      showNavigationInHeader={false}
      showUserSectionInHeader
    >
      <Stepper selectable={false} steps={StepperSteps(t)} />
      <Outlet />
    </SingleColumnLayout>
  )
}

export default BaseCurrencyComponent
