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
      return Promise.reject({
        general:
          'Hmm, seems like your credentials are not correct, can you try again?',
      })
    case undefined:
      return Promise.reject({
        general:
          "Seems like the server is offline, try again later, we'll be back!",
      })
    default:
      return Promise.reject({ general: 'We got an unknown error, try again' })
  }
}
