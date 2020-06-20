import React, { FunctionComponent } from 'react'
import { Card, Heading, BoxProps, Flex } from 'theme-ui'

import { Currency } from '../../shared/types/currency'

type CurrencyCardProps = {
  currency: Currency
  selected: boolean
} & BoxProps

const CurrencyCard: FunctionComponent<CurrencyCardProps> = props => {
  const { currency, selected, sx } = props

  return (
    <Card
      {...(props as any)}
      sx={{ ...sx, p: 3 }}
      variant={selected ? 'selected' : 'primary'}
    >
      <Flex>
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
      </Flex>
    </Card>
  )
}

export default CurrencyCard
