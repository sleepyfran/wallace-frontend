import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import { ReactComponent as SearchIcon } from '../../assets/search.svg'
import InputWithIcon from './InputWithIcon'

type SearchProps = {
  placeholder?: string
}

const SearchComponent: FunctionComponent<SearchProps> = ({ placeholder }) => {
  const { t } = useTranslation()

  return (
    <InputWithIcon
      Icon={SearchIcon}
      placeholder={placeholder || t('common.hints.search')}
      side="right"
    />
  )
}

export default SearchComponent
