import React, { ReactNode } from 'react'
import { Bold } from '../inline-text/bold/bold'
import { styled } from '../theme'
import { Box } from './Box'
import { Stack } from './Stack'

interface SectionProps {
  title: string
  children?: ReactNode
}

const Border = styled('hr', {
  width: '100%',
  height: 1,
  border: 'none',
  backgroundColor: 'var(--figma-color-border)'
})

export const Section = ({ title, children }: SectionProps) => {
  return (
    <Stack width="100%" direction="column" paddingTop="$extraSmall">
      <Stack
        width="100%"
        direction="column"
        spacing="$extraSmall"
        paddingBottom={children !== undefined ? '$medium' : undefined}
      >
        <Box
          height={32}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingBottom={4}
          paddingX="$medium"
        >
          <Bold>{title}</Bold>
        </Box>

        {children && <Box paddingX="$medium">{children}</Box>}
      </Stack>

      <Border />
    </Stack>
  )
}
