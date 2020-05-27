import React, { FunctionComponent } from 'react'
import { Input, Box, InputProps } from 'theme-ui'

type IconSide = 'left' | 'right'

type InputWithIconProps = {
  Icon: FunctionComponent
  side: IconSide
} & Partial<HTMLInputElement> &
  Partial<InputProps>

/**
 * Defines an input that displays an icon in one of the sides.
 */
const InputWithIcon: FunctionComponent<InputWithIconProps> = props => {
  const { Icon, side } = props
  const paddingKey = side === 'left' ? 'pl' : 'pr'
  const marginKey = side === 'left' ? 'ml' : 'mr'

  return (
    <Box sx={{ position: 'relative' }}>
      <Input {...(props as any)} sx={{ [paddingKey]: 5 }} />
      <Box
        sx={{
          position: 'absolute',
          [marginKey]: 3,
          mt: '5px',
          top: 0,
          right: 0,
        }}
      >
        <Icon />
      </Box>
    </Box>
  )
}

export default InputWithIcon
