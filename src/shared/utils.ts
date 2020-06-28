import { pipe } from 'fp-ts/lib/function'
import { Option, fold, fromNullable } from 'fp-ts/lib/Option'
import { cloneDeep, isNil } from 'lodash'
import { Observable, of, throwError } from 'rxjs'
import { Result } from 'validum'

type ThemePropertyValue = string | number
type MarginType = 'm' | 'mt' | 'mr' | 'mb' | 'ml' | 'mx' | 'my'

/**
 * Returns obj if value is not undefined or an empty object otherwise.
 */
const applyIfValue = <T>(obj: T, value?: unknown): T | {} =>
  value !== undefined ? obj : {}

/**
 * Creates an object that can be passed into the `sx` property that applies
 * a margin of the specified type and value to all children but the first. If
 * the value passed is undefined it will return an empty object.
 * @param marginType Type of margin to apply (same as a normal sx object).
 * @param value Raw or theme value to apply.
 */
export const withMarginInAllButFirstChild = (
  marginType: MarginType,
  value?: ThemePropertyValue
) =>
  applyIfValue(
    {
      '& > :not(:first-child)': {
        [marginType]: value,
      },
    },
    value
  )

/**
 * Checks that the given date is not an invalid date.
 * @param date Date to check.
 */
// eslint-disable-next-line no-restricted-globals
export const validDate = (date: Date) => isFinite(Number(date))

/**
 * Transforms a Validum's result into the internal representation of errors
 * of the form machine.
 * @param result Result from the Validum library.
 */
export const errorsFromResult = <T>(
  result: Result<T>
): { [P in keyof T]: T[P] } =>
  result.errors().reduce(
    (prev, curr) => ({
      ...prev,
      [curr.property as keyof T]: curr.message,
    }),
    {} as T
  )

/**
 * Transforms an error's response data into the internal representation of errors
 * of the form machine. TODO: Add types to this in the near future.
 * @param response Response from the error response.
 */
export const errorsFromResponse = (response: Option<any>): any =>
  pipe(
    response,
    fold(
      () => ({ general: 'Please fill all the inputs correctly' } as any),
      r => {
        const { errors } = r

        return Object.keys(errors).reduce(
          (prev, curr) => ({
            ...prev,
            [curr.toLowerCase()]: errors[curr],
          }),
          {}
        )
      }
    )
  )

/**
 * Transforms a Option data type into an Observable that emits the content
 * of the maybe if it's a Just or throws an empty error if the content is
 * Nothing.
 * @param maybe Option to transform.
 */
export const maybeToObservable = <T>(maybe: Option<T>): Observable<T> =>
  pipe(
    maybe,
    fold(
      () => throwError(''),
      t => of(t)
    )
  )

/**
 * Checks if `parent` includes `child` ignoring casing.
 */
export const lowercaseIncludes = (parent: string, child: string): boolean =>
  parent.toLowerCase().includes(child.toLowerCase())

/**
 * Checks if the given path matches a given URL.
 * @param location Path to check.
 * @param url Url to check.
 */
export const matchesRoute = (path: string, url?: string) => path === url

/**
 * Takes an object that contains Option values that could have lost its inner
 * methods while stringifying them and puts them back into the object.
 * @param input Input to transform.
 */
export const wrapFalsyMaybes = <T, K extends keyof T>(input: T): T => {
  if (isNil(input)) return input

  const keys = (Object.keys(input) as unknown) as K[]
  const transformedInput = cloneDeep(input)

  keys.forEach(k => {
    if (typeof input[k] === typeof Option)
      transformedInput[k] = fromNullable(input[k]) as any
  })

  return transformedInput
}
