import { TFunction } from 'i18next'
import { NonEmptyList } from 'purify-ts'

import { Step } from '../../../shared/components/Stepper'

export const StepperSteps = (t: TFunction): NonEmptyList<Step> =>
  NonEmptyList.unsafeCoerce([
    {
      name: 'baseCurrency',
      title: t('setup.baseCurrency.stepTitle'),
      url: 'baseCurrency',
    },
    {
      name: 'firstAccount',
      title: t('setup.firstAccount.stepTitle'),
      url: 'firstAccount',
    },
    {
      name: 'categories',
      title: t('setup.categories.stepTitle'),
      url: 'categories',
    },
  ])
