/**
 * Returns whether the given type contains the literal 'error' anywhere.
 * @param type Content of the type field of the event.
 */
export const containsError = (type: string) =>
  type.toLowerCase().includes('error')
