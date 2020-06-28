import { Option } from 'fp-ts/lib/Option'
import { Observable } from 'rxjs'

export type ApiError = {
  code: number
  response: string
}

/**
 * Context common to all API calls.
 */
export type ApiContext<T> = {
  error: Option<ApiError>
  apiCall: () => Observable<unknown>
}

/**
 * Defines the different states in which the API machine can be.
 */
export type ApiState<T> =
  | {
      value: 'waiting'
      context: ApiContext<T>
    }
  | {
      value: 'loading'
      context: ApiContext<T>
    }
  | {
      value: 'success'
      context: ApiContext<T>
    }
  | {
      value: 'error'
      context: ApiContext<T>
    }

/**
 * Different events that can be raised in this machine.
 */
export type ErrorEvent = { type: 'ERROR'; data: ApiError }
export type ApiEvent<T> =
  | {
      type: 'CALL'
    }
  | ErrorEvent
  | { type: 'SUCCESS'; data: T }
