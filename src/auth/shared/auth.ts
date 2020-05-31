import { DateTime } from 'luxon'
import { Maybe, Nothing, Just } from 'purify-ts'

import { Token, User } from '../../shared/types/user'
import { refreshToken } from './api/auth.api'

const isValidToken = (token: Token): boolean =>
  DateTime.fromISO(token.expiry) > DateTime.utc()

const hasValidAccessToken = (user: User): boolean =>
  isValidToken(user.token.accessToken)

const hasValidRefreshToken = (user: User): boolean =>
  isValidToken(user.token.refreshToken)

/**
 * Checks if both tokens are valid and attempts to refresh the access token
 * if it's needed. If the access token is still valid, the given user will
 * be resolved. If the refresh token is not valid, Nothing will be resolved.
 * @param user Current user data.
 */
export const refreshTokenIfNeeded = (user: User): Promise<Maybe<User>> => {
  if (hasValidAccessToken(user)) return Promise.resolve(Just(user))
  if (!hasValidRefreshToken(user)) return Promise.resolve(Nothing)

  return refreshToken(user.token.refreshToken)
    .then(res => ({
      ...user,
      token: res.data,
    }))
    .then(u => Just(u))
    .catch(() => Nothing)
}
