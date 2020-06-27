import { isNil } from 'lodash'
import { Just, Nothing } from 'purify-ts'

import { Paths } from '../../routes'
import { Policy } from '../../shared/components/RedirectPolicy'
import { UserPreferences } from './model/model'

/**
 * Redirects to the corresponding screen based on what's missing in the user
 * preference object.
 */
const redirectPolicy: Policy<UserPreferences | undefined> = (_, localState) => {
  if (isNil(localState)) return Just(Paths.setup.baseCurrency)
  if (localState.baseCurrency.isNothing()) return Just(Paths.setup.baseCurrency)
  if (localState.account.isNothing()) return Just(Paths.setup.firstAccount)

  return Nothing
}

export default redirectPolicy
