import { DateTime } from 'luxon'
import { of, Observable, throwError } from 'rxjs'
import { map } from 'rxjs/operators'

import { Token, User } from '../../shared/types/user'
import { refreshToken } from './api/auth.api'
import ExpiredRefreshTokenError from './errors/expired-refresh-token.error'

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
export const refreshTokenIfNeeded = (user: User): Observable<User> => {
  if (hasValidAccessToken(user)) return of(user)
  if (!hasValidRefreshToken(user)) return throwError(ExpiredRefreshTokenError)

  return refreshToken(user.token.refreshToken).pipe(
    map(res => ({ ...user, token: res.data }))
  )
}
