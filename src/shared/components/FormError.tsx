import React, { FunctionComponent } from 'react'
import { Label } from 'theme-ui'

type FormErrorProps = {
  message?: string
}

const FormError: FunctionComponent<FormErrorProps> = ({ message }) =>
  message ? <Label variant="error">{message}</Label> : <></>

export default FormError
