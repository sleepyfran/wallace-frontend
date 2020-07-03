import React, { FunctionComponent } from 'react'
import { useLocation } from 'react-router'
import { Flex, Link } from 'theme-ui'

import Routes from '../../routes'

export type NavigationProps = {}

const NavigationComponent: FunctionComponent<NavigationProps> = () => {
  const location = useLocation()
  const headerRoutes = Routes.filter(r => r.showInNavigation)

  const notFirst = (index: number) => index !== 0
  const current = (path: string) => location.pathname === path

  return (
    <Flex
      sx={{
        px: 5,
        pt: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {headerRoutes.map((hr, index) => (
        <Link
          href={hr.path}
          sx={{ ml: notFirst(index) ? 2 : 0 }}
          variant={current(hr.path) ? 'navCurrent' : 'nav'}
        >
          <Flex>{hr.name}</Flex>
        </Link>
      ))}
    </Flex>
  )
}

export default NavigationComponent
