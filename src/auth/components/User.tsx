import { pipe } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Option'
import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { Box, Flex, Text } from 'theme-ui'

import { ReactComponent as UserIcon } from '../../assets/user.svg'
import { RootState } from '../../shared/store/rootReducer'

const UserComponent: FunctionComponent = () => {
  const maybeUser = useSelector((state: RootState) => state.auth.loggedInUser)

  return pipe(
    maybeUser,
    fold(
      () => <></>,
      user => (
        <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ fill: 'text', height: '32px', width: '32px' }}>
            <UserIcon />
          </Box>
          <Text
            sx={{
              maxWidth: '200px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {user.name}
          </Text>
        </Flex>
      )
    )
  )
}

export default UserComponent
