import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { Box, Flex, Text } from 'theme-ui'

import { ReactComponent as UserIcon } from '../../assets/user.svg'
import { RootState } from '../../shared/store/rootReducer'

const UserComponent: FunctionComponent = () => {
  const maybeUser = useSelector((state: RootState) => state.auth.loggedInUser)

  return maybeUser.caseOf({
    Just: user => (
      <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ fill: 'text', height: '32px', width: '32px' }}>
          <UserIcon />
        </Box>
        <Text>{user.name}</Text>
      </Flex>
    ),
    Nothing: () => <></>,
  })
}

export default UserComponent
