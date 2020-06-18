import i18next from 'i18next'
import { throwError } from 'rxjs'

import genericErrorHandler from '../../shared/api/generic.errorHandler'
import { Result } from '../../shared/api/interface'

export default <T>(err: Result<T>) => {
  switch (err.statusCode) {
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
