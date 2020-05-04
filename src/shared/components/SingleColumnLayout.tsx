import React, { FunctionComponent } from 'react'
import { Box, Heading, Flex } from 'theme-ui'

import Layout, { LayoutProps } from './Layout'

export type SingleColumnLayoutProps = {
  title: string
} & LayoutProps

const SingleColumnLayout: FunctionComponent<SingleColumnLayoutProps> = props => {
  const { title, children } = props

  return (
    <Layout {...props}>
      <Flex sx={{ flexDirection: 'column', alignItems: 'center', mt: 3 }}>
        <Heading>{title}</Heading>
        <Box sx={{ mt: 3, px: [1, 3, 4], width: ['100%', '50%', '25%'] }}>
          {children}
        </Box>
      </Flex>
    </Layout>
  )
}

export default SingleColumnLayout
