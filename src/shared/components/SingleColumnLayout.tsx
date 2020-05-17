import React, { FunctionComponent } from 'react'
import { Box, Heading, Flex } from 'theme-ui'

import { withMarginInAllButFirstChild } from '../utils'
import Layout, { LayoutProps } from './Layout'

export type SingleColumnLayoutProps = {
  title: string
  childrenMargin?: string | number
} & LayoutProps

const SingleColumnLayout: FunctionComponent<SingleColumnLayoutProps> = props => {
  const { title, children, childrenMargin } = props

  return (
    <Layout {...props}>
      <Flex sx={{ flexDirection: 'column', alignItems: 'center', mt: 3 }}>
        <Heading>{title}</Heading>
        <Box
          sx={{
            mt: 3,
            px: [1, 3, null, 4],
            width: ['100%', '50%', null, '40%', '25%'],
            ...withMarginInAllButFirstChild('mt', childrenMargin),
          }}
        >
          {children}
        </Box>
      </Flex>
    </Layout>
  )
}

export default SingleColumnLayout
