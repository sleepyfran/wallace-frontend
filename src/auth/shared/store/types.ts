import { Maybe } from 'purify-ts'

import { User } from '../../../shared/types/user'

export type AuthState = {
  loggedInUser: Maybe<User>
}
