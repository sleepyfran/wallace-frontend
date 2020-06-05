import i18next from 'i18next'
import { throwError } from 'rxjs'

import { ErrorResponse } from '../../shared/api/api'
import genericErrorHandler from '../../shared/api/generic.errorHandler'

export default <T>(err: ErrorResponse<T>) => {
  switch (err.response?.status) {
    case 400:
    case 401:
    case 404:
      return throwError({
        general: i18next.t('auth.login.errors.wrongCredentials'),
      })
    default:
      return genericErrorHandler(err)
  }
}
