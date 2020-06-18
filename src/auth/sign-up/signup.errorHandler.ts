import genericErrorHandler from '../../shared/api/generic.errorHandler'
import { Result } from '../../shared/api/interface'

export default <T>(err: Result<T>) => genericErrorHandler(err)
