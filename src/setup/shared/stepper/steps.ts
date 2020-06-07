import { TFunction } from 'i18next'
import { NonEmptyList } from 'purify-ts'

import { Paths } from '../../../routes'
import { Step } from '../../../shared/components/UrlStepper'

export const StepperSteps = (t: TFunction): NonEmptyList<Step> =>
  NonEmptyList.unsafeCoerce([
    {
      name: 'baseCurrency',
      title: t('setup.baseCurrency.stepTitle'),
      url: Paths.setup.baseCurrency,
    },
    {
      name: 'firstAccount',
      title: t('setup.firstAccount.stepTitle'),
      url: Paths.setup.firstAccount,
    },
    {
      name: 'categories',
      title: t('setup.categories.stepTitle'),
      url: Paths.setup.categories,
    },
  ])
