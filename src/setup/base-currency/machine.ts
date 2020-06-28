import { Option, some, none, isSome } from 'fp-ts/lib/Option'
import { assign, createMachine } from 'xstate'

import { Currency } from '../../shared/types/currency'
import { lowercaseIncludes } from '../../shared/utils'
import { getCurrencies } from '../shared/api/setup.api'

type BaseCurrencyContext = {
  filteredCurrencies: Currency[]
  currencies: Currency[]
  selected: Option<Currency>
}

type BaseCurrencyState =
  | {
      value: 'loading'
      context: BaseCurrencyContext
    }
  | {
      value: 'loaded'
      context: BaseCurrencyContext
    }
  | {
      value: 'error'
      context: BaseCurrencyContext
    }

type LoadedEvent = { type: 'LOADED'; data: Currency[] }

type SelectedEvent = { type: 'SELECT'; currency: Currency }

type BaseCurrencyEvent =
  | LoadedEvent
  | SelectedEvent
  | { type: 'SEARCH'; input: string }
  | {
      type: 'NEXT'
    }
  | {
      type: 'RETRY'
    }

const isLoadedEvent = (event: BaseCurrencyEvent): event is LoadedEvent =>
  event.type.includes('loadCurrencies')

const isSelectedEvent = (event: BaseCurrencyEvent): event is SelectedEvent =>
  event.type === 'SELECT'

export default createMachine<
  BaseCurrencyContext,
  BaseCurrencyEvent,
  BaseCurrencyState
>(
  {
    initial: 'loading',
    context: {
      filteredCurrencies: [],
      currencies: [],
      selected: none,
    },
    states: {
      loading: {
        invoke: {
          src: 'loadCurrencies',
          onDone: {
            target: 'loaded',
            actions: ['onCurrenciesLoaded'],
          },
          onError: {
            target: 'error',
          },
        },
      },

      loaded: {
        initial: 'notSelected',

        on: {
          SEARCH: {
            actions: ['onSearchInput'],
          },

          SELECT: {
            actions: ['setSelected'],
            target: 'loaded.selected',
          },
        },

        states: {
          notSelected: {},

          selected: {
            on: {
              NEXT: {
                target: '#success',
                cond: 'currencySelected',
              },
            },
          },
        },
      },

      error: {
        id: 'error',
        on: {
          RETRY: {
            target: 'loading',
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
      onCurrenciesLoaded: assign({
        currencies: (context, event) =>
          isLoadedEvent(event) ? event.data : context.currencies,
        filteredCurrencies: (context, event) =>
          isLoadedEvent(event) ? event.data : context.filteredCurrencies,
      }),

      onSearchInput: assign({
        filteredCurrencies: (context, event) =>
          event.type === 'SEARCH'
            ? event.input === ''
              ? context.currencies
              : context.currencies.filter(
                  currency =>
                    lowercaseIncludes(currency.name, event.input) ||
                    lowercaseIncludes(currency.code, event.input)
                )
            : context.currencies,
      }),

      setSelected: assign({
        selected: (context, event) =>
          isSelectedEvent(event) ? some(event.currency) : context.selected,
      }),
    },

    guards: {
      currencySelected: context => isSome(context.selected),
    },

    services: {
      loadCurrencies: () =>
        getCurrencies()
          .toPromise()
          .then(resp => resp.data),
    },
  }
)
