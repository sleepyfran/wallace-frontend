import React, { FunctionComponent } from 'react'
import { Box, Text, Flex } from 'theme-ui'

import { ReactComponent as UserIcon } from '../../assets/user.svg'
import { User } from '../types/user'

type UserProps = {
  user?: User
}

const UserComponent: FunctionComponent<UserProps> = ({ user }) =>
  user ? (
    <Flex sx={{ flexDirection: 'column' }}>
      <Box sx={{ fill: 'text', height: '32px', width: '32px' }}>
        <UserIcon />
      </Box>
      <Text>{user.name}</Text>
    </Flex>
  ) : (
    <></>
  )

export default UserComponent
