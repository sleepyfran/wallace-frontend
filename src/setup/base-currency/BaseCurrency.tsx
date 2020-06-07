import { useMachine } from '@xstate/react'
import React, { ChangeEvent, FunctionComponent, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Text, Button, Spinner, Flex } from 'theme-ui'

import { Paths } from '../../routes'
import Search from '../../shared/components/Search'
import SingleColumnLayout from '../../shared/components/SingleColumnLayout'
import Stepper from '../../shared/components/Stepper'
import { Currency } from '../../shared/types/currency'
import { StepperSteps } from '../shared/stepper/steps'
import CurrencyCard from './CurrencyCard'
import BaseCurrencyMachine from './machine'

const BaseCurrencyComponent: FunctionComponent = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [current, send] = useMachine(BaseCurrencyMachine)

  const isSelectedCurrency = (currency: Currency) =>
    current.context.selected.caseOf({
      Just: c => c.code === currency.code,
      Nothing: () => false,
    })

  useEffect(() => {
    if (current.matches('success')) navigate(Paths.setup.firstAccount)
  }, [current, navigate])

  return (
    <SingleColumnLayout childrenMargin={3} showUserSectionInHeader>
      <Stepper selectable={false} steps={StepperSteps(t)} />
      <Text>{t('setup.baseCurrency.hint')}</Text>
      <Search
        disabled={!current.matches('loaded')}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          send({ type: 'SEARCH', input: event.target.value })
        }
      />

      <Flex sx={{ justifyContent: 'center' }}>
        {current.matches('loading') ? (
          <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text>{t('setup.baseCurrency.loadingLabel')}</Text>
            <Spinner />
          </Flex>
        ) : (
          <></>
        )}

        {current.matches('loaded') ? (
          <Flex
            sx={{
              flexDirection: 'column',
              maxHeight: '600px',
              overflow: 'scroll',
              p: 2,
              width: '100%',
            }}
          >
            {current.context.filteredCurrencies.map(currency => (
              <CurrencyCard
                currency={currency}
                key={currency.code}
                onClick={() => send({ type: 'SELECT', currency })}
                selected={isSelectedCurrency(currency)}
                sx={{ mt: 2 }}
              />
            ))}
          </Flex>
        ) : (
          <></>
        )}

        {current.matches('error') ? (
          <Text variant="error">
            {t('setup.baseCurrency.errorLabel')}{' '}
            <Button onClick={() => send('RETRY')} variant="anchor">
              {t('setup.baseCurrency.retryLink')}
            </Button>
          </Text>
        ) : (
          <></>
        )}
      </Flex>

      <Button
        disabled={!current.matches('loaded.selected')}
        onClick={() => send({ type: 'NEXT' })}
        variant="outline"
      >
        {t('common.nextStep')}
      </Button>
    </SingleColumnLayout>
  )
}

export default BaseCurrencyComponent
