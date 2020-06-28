import { some, none } from 'fp-ts/lib/Option'
import { throwError } from 'rxjs'
import { assign, createMachine } from 'xstate'

import { ApiContext, ApiEvent, ApiState, ErrorEvent } from './types/api.machine'
import { containsError } from './utils'

const isErrorEvent = <T>(event: ApiEvent<T>): event is ErrorEvent =>
  containsError(event.type)

export const createApiMachine = <T>() =>
  createMachine<ApiContext<T>, ApiEvent<T>, ApiState<T>>(
    {
      initial: 'waiting',
      context: {
        apiCall: () => throwError(''),
        error: none,
      },
      states: {
        waiting: {
          initial: 'firstRun',
          on: {
            CALL: {
              target: 'loading',
            },
          },
          states: {
            firstRun: {},
            error: {},
          },
        },
        loading: {
          invoke: {
            src: 'callApi',
            onDone: 'success',
            onError: {
              target: 'waiting.error',
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
        onError: assign({
          error: (context, event: ApiEvent<T>) =>
            isErrorEvent(event) ? some(event.data) : context.error,
        }),
      },
      services: {
        callApi: context => context.apiCall(),
      },
    }
  )
