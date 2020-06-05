import i18next from 'i18next'
import { Maybe } from 'purify-ts'
import { throwError } from 'rxjs'

import { errorsFromResponse } from '../utils'
import { ErrorResponse } from './api'

/**
 * Generic handler that applies to all requests.
 * @param err Error produced in the request.
 */
export default <T>(err: ErrorResponse<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maybeData = Maybe.fromNullable(err.response?.data as any)

  switch (err.response?.status) {
    case 400:
      return throwError(errorsFromResponse(maybeData))
    case undefined:
      return throwError({
        general: i18next.t('common.errors.serverOffline'),
      })
    default:
      return throwError({ general: i18next.t('common.errors.unknown') })
  }
}
