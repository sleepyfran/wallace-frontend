import { Maybe } from 'purify-ts'
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
export const errorsFromResponse = (response: Maybe<any>): any =>
  response.caseOf({
    Just: r => {
      const { errors } = r

      return Object.keys(errors).reduce(
        (prev, curr) => ({
          ...prev,
          [curr.toLowerCase()]: errors[curr],
        }),
        {}
      )
    },
    Nothing: () => ({ general: 'Please fill all the inputs correctly' } as any),
  })

/**
 * Transforms a Maybe data type into an Observable that emits the content
 * of the maybe if it's a Just or throws an empty error if the content is
 * Nothing.
 * @param maybe Maybe to transform.
 */
export const maybeToObservable = <T>(maybe: Maybe<T>): Observable<T> =>
  maybe.caseOf({
    Just: content => of(content),
    Nothing: () => throwError(''),
  })
