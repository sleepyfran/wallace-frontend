/**
 * Defines the context common to all forms.
 */
export type FormContext<T> = {
  values: { [P in keyof T]?: T[P] }
  errors: { [P in keyof T]?: string } & { general?: string }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit: (values: T) => Promise<any>
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

/**
 * Defines the events that can happen in a promise.
 */
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
