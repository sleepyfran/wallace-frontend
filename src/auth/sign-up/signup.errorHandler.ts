import { ErrorResponse } from '../../shared/api/api'
import genericErrorHandler from '../../shared/api/generic.errorHandler'

export default <T>(err: ErrorResponse<T>) => genericErrorHandler(err)
