import { isNil } from 'lodash'
import { Just, Nothing } from 'purify-ts'

import { Paths } from '../../routes'
import { Policy } from '../../shared/components/RedirectPolicy'
import { UserPreference } from './model/model'

/**
 * Redirects to the corresponding screen based on what's missing in the user
 * preference object.
 */
const redirectPolicy: Policy<UserPreference | undefined> = (_, localState) => {
  if (isNil(localState)) return Just(Paths.setup.baseCurrency)
  if (localState.baseCurrency.isNothing()) return Just(Paths.setup.baseCurrency)
  if (localState.account.isNothing()) return Just(Paths.setup.firstAccount)

  return Nothing
}

export default redirectPolicy
