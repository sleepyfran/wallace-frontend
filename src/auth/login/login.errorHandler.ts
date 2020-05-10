import { Maybe } from 'purify-ts'

import { ErrorResponse } from '../../shared/api/api'
import { errorsFromResponse } from '../../shared/utils'

/**
 * Handles the possible errors that the backend can generate and adapts them
 * to the form machine error handling.
 * @param err Error produced in the request.
 */
export default <T>(err: ErrorResponse<T>) => {
  const maybeData = Maybe.fromNullable(err.response?.data as any)

  switch (err.response?.status) {
    case 400:
      return Promise.reject(errorsFromResponse(maybeData))
    case 404:
      return Promise.reject({ general: 'Check your credentials' })
    default:
      return Promise.reject({ general: 'Unknown error, please try again' })
  }
}
