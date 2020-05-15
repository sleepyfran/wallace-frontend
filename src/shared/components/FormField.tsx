import React, { FunctionComponent } from 'react'
import { Field, FieldProps } from 'theme-ui'

/**
 * Wrapper around theme-ui's field so that we don't have to be constantly specifying the type of the Field.
 */
const FormField: FunctionComponent<FieldProps<'input'>> = props => (
  <Field<'input'> {...props} />
)

export default FormField
