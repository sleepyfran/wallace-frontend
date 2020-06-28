import { fromNullable } from 'fp-ts/lib/Option'
import i18next from 'i18next'
import { throwError } from 'rxjs'

import { errorsFromResponse } from '../utils'
import { Result } from './interface'

/**
 * Generic handler that applies to all requests.
 * @param err Error produced in the request.
 */
export default <T>(err: Result<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maybeData = fromNullable(err.data as any)

  switch (err.statusCode) {
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
