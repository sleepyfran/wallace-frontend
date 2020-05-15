import { assign, createMachine } from 'xstate'

import {
  ChangeEvent,
  ErrorEvent,
  FormContext,
  FormEvent,
  FormState,
} from '../types/machine'
import { errorsFromResult } from '../utils'

const isChangeEvent = <T, K extends keyof T>(
  event: FormEvent<T, K>
): event is ChangeEvent<T, K> => event.type === 'CHANGE'

const isErrorEvent = <T, K extends keyof T>(
  event: FormEvent<T, K>
): event is ErrorEvent<T, K> => event.type.toLowerCase().includes('error')

/**
 * Creates a state machine that handles a form given a type T. It'll
 * automatically handle all changes of the values and populate errors for
 * specific values.
 */
export const createFormMachine = <T, K extends keyof T>() =>
  createMachine<FormContext<T>, FormEvent<T, K>, FormState<T>>(
    {
      initial: 'editing',
      context: {
        values: {},
        errors: {},
        submit: () => Promise.reject(),
        validate: () => ({} as any),
      },
      states: {
        editing: {
          initial: 'pristine',
          on: {
            CHANGE: {
              actions: ['onChange'],
            },
            SUBMIT: 'validating',
          },
          states: {
            pristine: {
              entry: ['clearForm'],
            },
            error: {},
          },
        },
        validating: {
          invoke: {
            src: 'validate',
            onDone: 'submitting',
            onError: {
              target: 'editing.error',
              actions: ['onError'],
            },
          },
        },
        submitting: {
          invoke: {
            src: 'onSubmit',
            onDone: 'success',
            onError: {
              target: 'editing.error',
              actions: ['onError'],
            },
          },
        },
        success: {
          id: 'success',
        },
      },
    },
    {
      actions: {
        onChange: assign({
          values: (context, event: FormEvent<T, K>) =>
            isChangeEvent(event)
              ? {
                  ...context.values,
                  [event.key]: event.value,
                }
              : context.values,
        }),

        onError: assign({
          errors: (context, event: FormEvent<T, K>) =>
            isErrorEvent(event) ? event.data : context.errors,
        }),

        clearForm: assign(context => ({
          values: {},
          errors: {},
          submit: context.submit,
        })),
      },

      services: {
        /**
         * Invokes the validation and resolves or rejects depending if it has
         * errors or not.
         */
        validate: context =>
          new Promise((resolve, reject) => {
            const result = context.validate(context.values as T)

            return result.fold(
              () => reject(errorsFromResult(result)),
              input => resolve(input)
            )
          }),
        onSubmit: context => context.submit(context.values as T),
      },
    }
  )
