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
