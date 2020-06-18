import React, { FunctionComponent } from 'react'
import { Flex } from 'theme-ui'

const DeveloperModePopUp: FunctionComponent = () => (
  <>
    {process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_USE_FAKE_API ? (
      <Flex
        sx={{
          justifyContent: 'center',
          bg: 'expense',
          color: 'invertedText',
          p: 2,
        }}
      >
        Developer mode on. Using fake API
      </Flex>
    ) : (
      <></>
    )}
  </>
)

export default DeveloperModePopUp
