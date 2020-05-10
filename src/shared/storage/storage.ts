import { Maybe } from 'purify-ts'

import { Storage } from './types'

/**
 * Retrieves an item from the storage in a type-safe way.
 * @param key Key of the storage to retrieve.
 */
export const retrieveFromStorage = <K extends keyof Storage>(
  key: K
): Maybe<Storage[K]> => Maybe.fromNullable(localStorage.getItem(key))
