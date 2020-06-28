import { Option } from 'fp-ts/lib/Option'

import { User } from '../../../shared/types/user'

export type AuthState = {
  loggedInUser: Option<User>
}
