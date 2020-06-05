import React, { FunctionComponent } from 'react'
import { Flex, Spinner } from 'theme-ui'

const FullScreenLoading: FunctionComponent = () => (
  <Flex
    sx={{
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
    }}
  >
    <Spinner />
  </Flex>
)

export default FullScreenLoading
