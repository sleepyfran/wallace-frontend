import { Observable } from 'rxjs'
import { Result } from 'validum'

/**
 * Defines the context common to all forms.
 */
export type FormContext<T> = {
  values: { [P in keyof T]?: T[P] }
  errors: { [P in keyof T]?: string } & { general?: string }
  submit: (values: T) => Observable<unknown>
  validate: (values: T) => Result<T>
}

/**
 * Defines the different states of a form.
 */
export type FormState<T> =
  | {
      value: 'editing'
      context: FormContext<T>
    }
  | {
      value: 'submitting'
      context: FormContext<T>
    }
  | {
      value: 'success'
      context: FormContext<T>
    }

export type ChangeEvent<T, K extends keyof T> = {
  type: 'CHANGE'
  key: K
  value: T[K]
}
export type SubmitEvent = { type: 'SUBMIT' }
export type ErrorEvent<T, K extends keyof T> = {
  type: 'ERROR'
  data: { [P in keyof T]?: string }
}

export type FormEvent<T, K extends keyof T> =
  | ChangeEvent<T, K>
  | SubmitEvent
  | ErrorEvent<T, K>
