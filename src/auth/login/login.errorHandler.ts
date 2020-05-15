import { ErrorResponse } from '../../shared/api/api'
import genericErrorHandler from '../../shared/api/generic.errorHandler'

export default <T>(err: ErrorResponse<T>) => {
  switch (err.response?.status) {
    case 404:
      return Promise.reject({
        general:
          'Hmm, seems like your credentials are not correct, can you try again?',
      })
    default:
      return genericErrorHandler(err)
  }
}
