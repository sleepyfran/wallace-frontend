import { some, none, isNone } from 'fp-ts/lib/Option'
import { isNil } from 'lodash'

import { Paths } from '../../routes'
import { Policy } from '../../shared/components/RedirectPolicy'
import { UserPreferences } from './model/model'

/**
 * Redirects to the corresponding screen based on what's missing in the user
 * preference object.
 */
const redirectPolicy: Policy<UserPreferences | undefined> = (_, localState) => {
  if (isNil(localState)) return some(Paths.setup.baseCurrency)
  if (isNone(localState.baseCurrency)) return some(Paths.setup.baseCurrency)
  if (isNone(localState.account)) return some(Paths.setup.firstAccount)

  return none
}

export default redirectPolicy
