import { Maybe } from 'purify-ts'

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
      return Promise.reject(errorsFromResponse(maybeData))
    case undefined:
      return Promise.reject({
        general:
          "Seems like the server is offline, try again later, we'll be back!",
      })
    default:
      return Promise.reject({ general: 'We got an unknown error, try again' })
  }
}
