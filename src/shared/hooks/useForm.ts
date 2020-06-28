import { useMachine } from '@xstate/react'
import { ChangeEvent, FormEvent } from 'react'

import { createFormMachine } from '../machines/form.machine'
import { FormContext } from '../machines/types/form.machine'

/**
 * Hooks that automatically creates a form machine and exposes the methods
 * for handling changes and submitting.
 */
export const useForm = <TInput>(context: FormContext<TInput>) => {
  const formMachine = createFormMachine<TInput, keyof TInput>()
  const machine = useMachine(formMachine.withContext(context))
  const [, send] = machine

  /**
   * Handler to pass to every input field of the form. It will automatically
   * call the CHANGE event in the machine so that the field gets updated.
   * @param event HTML input event.
   */
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault()
    send('CHANGE', {
      key: event.target.name,
      value: event.target.value,
    })
  }

  /**
   * Handler for the submit action of the form. It will fire up the SUBMIT event
   * in the machine.
   * @param event Form event.
   */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    send('SUBMIT')
  }

  return {
    machine,
    handleChange,
    handleSubmit,
  }
}
