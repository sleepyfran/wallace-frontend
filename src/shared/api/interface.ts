import { Observable } from 'rxjs'

/**
 * Result type in which all requests will be wrapped.
 */
export type Result<R> = {
  statusCode: number
  data: R
}

export type Response<R> = Observable<Result<R>>

/**
 * Defines the set of operations available in the API.
 */
export default interface Api {
  get: <R>(endpoint: string) => Response<R>
  post: <R>(endpoint: string, data: any) => Response<R>
  put: <R>(endpoint: string, data: any) => Response<R>
  delete: <R>(endpoint: string) => Response<R>
}
