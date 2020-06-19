import React, { FunctionComponent, useEffect } from 'react'
import { Select, SelectProps, Label } from 'theme-ui'

export type SelectItem = {
  label: string
  value: string
}

export type SelectComponentProps = {
  options: SelectItem[]
  selected: string
  label: string
} & SelectProps

const SelectComponent: FunctionComponent<SelectComponentProps> = props => {
  const { label, options, selected, onChange, name } = props

  // A very, very hacky way of 'notifying' of the initial value. I can't find
  // an easier way right now so let it be :)
  useEffect(() => {
    if (selected && onChange)
      onChange({
        preventDefault: () => {},
        target: { name, value: selected },
      } as any)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Label>{label}</Label>
      <Select {...(props as any)} defaultValue={selected}>
        {options.map(o => (
          <option value={o.value}>{o.label}</option>
        ))}
      </Select>
    </div>
  )
}

export default SelectComponent
