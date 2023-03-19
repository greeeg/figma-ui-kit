import React from 'react'
import { Text, Box, Stack } from '../../lib'

import './App.css'

export const App = () => {
  return (
    <div className="container">
      <Box backgroundColor="$bgBrand">
        <Stack direction="column" spacing="$large">
          <Text>Hello Sandbox</Text>
          <Text>Hello Sandbox</Text>
        </Stack>
      </Box>
    </div>
  )
}
