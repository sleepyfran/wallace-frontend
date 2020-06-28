import { NonEmptyArray, cons } from 'fp-ts/lib/NonEmptyArray'
import { TFunction } from 'i18next'

import { Paths } from '../../../routes'
import { Step } from '../../../shared/components/UrlStepper'

export const StepperSteps = (t: TFunction): NonEmptyArray<Step> =>
  cons(
    {
      name: 'baseCurrency',
      title: t('setup.baseCurrency.stepTitle'),
      url: Paths.setup.baseCurrency,
    },
    [
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
    ]
  )
