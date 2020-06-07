import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'theme-ui'

const FirstAccountComponent: FunctionComponent = () => {
  const { t } = useTranslation()

  return (
    <>
      <Button disabled onClick={() => {}} variant="outline">
        {t('common.nextStep')}
      </Button>
    </>
  )
}

export default FirstAccountComponent
