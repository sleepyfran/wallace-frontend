import { Option, none, fromNullable } from 'fp-ts/lib/Option'

import { Storage } from './types'

/**
 * Retrieves an item from the storage in a type-safe way.
 * @param key Key of the storage to retrieve.
 */
export const retrieveFromStorage = <K extends keyof Storage>(
  key: K
): Option<Storage[K]> => {
  const localStorageContent = localStorage.getItem(key)
  if (!localStorageContent) return none

  return fromNullable(JSON.parse(localStorageContent) as Storage[K])
}

/**
 * Saves an item to the storage in a type-safe way.
 * @param key Key of the storage to retrieve.
 * @param content Content to save to the storage.
 */
export const saveToStorage = <K extends keyof Storage>(
  key: K,
  content: Storage[K] | undefined
) => localStorage.setItem(key, JSON.stringify(content))
