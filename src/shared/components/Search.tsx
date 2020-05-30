import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { InputProps } from 'theme-ui'

import { ReactComponent as SearchIcon } from '../../assets/search.svg'
import InputWithIcon from './InputWithIcon'

type SearchProps = {
  placeholder?: string
} & Partial<HTMLInputElement> &
  Partial<InputProps>

const SearchComponent: FunctionComponent<SearchProps> = props => {
  const { t } = useTranslation()
  const { placeholder } = props

  return (
    <InputWithIcon
      {...(props as any)}
      Icon={SearchIcon}
      placeholder={placeholder || t('common.hints.search')}
      side="right"
    />
  )
}

export default SearchComponent
