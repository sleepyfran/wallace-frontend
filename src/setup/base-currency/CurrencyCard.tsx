import React, { FunctionComponent } from 'react'
import { Card, Heading, BoxProps } from 'theme-ui'

import { Currency } from '../../shared/types/currency'

type CurrencyCardProps = {
  currency: Currency
  selected: boolean
} & BoxProps

const CurrencyCard: FunctionComponent<CurrencyCardProps> = props => {
  const { currency, selected, sx } = props

  const border = (theme: any) =>
    selected ? `2px solid ${theme.colors.selected}` : ''

  return (
    <Card {...(props as any)} sx={{ ...sx, display: 'flex', border, p: 3 }}>
      <Heading
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 3,
          width: '10%',
        }}
        variant="currencySymbol"
      >
        {currency.symbol}
      </Heading>
      <Heading
        sx={{
          fontWeight: 'lighter',
          display: 'inline',
          pl: 4,
          width: '90%',
        }}
      >
        {currency.name}
      </Heading>
    </Card>
  )
}

export default CurrencyCard
