import React from 'react'
import { Link } from '../inline-text/link/link'
import { Muted } from '../inline-text/muted/muted'
import { Box } from './Box'
import { Section } from './Section'
import { Stack } from './Stack'
import { Text } from './text/text'

interface PropertiesSectionProps {
  properties: Array<{
    label: string
    value: string
    href?: string
  }>
}

export const PropertiesSection = ({ properties }: PropertiesSectionProps) => {
  return (
    <Section title="Properties">
      <Stack direction="column" spacing="$extraSmall">
        {properties.map((property) => {
          const content = property.href ? (
            <Link href={property.href} target="_blank">
              <span
                title={property.value}
                style={{
                  display: 'inline-block',
                  width: 170,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {property.value}
              </span>
            </Link>
          ) : (
            <Text>
              <span
                title={property.value}
                style={{
                  display: 'inline-block',
                  width: 170,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {property.value}
              </span>
            </Text>
          )

          return (
            <Stack
              key={property.label}
              width="100%"
              direction="row"
              spacing="$small"
              flexWrap="nowrap"
              alignItems="center"
            >
              <Box width={64}>
                <Muted>{property.label}</Muted>
              </Box>
              <Box flexGrow={1}>{content}</Box>
            </Stack>
          )
        })}
      </Stack>
    </Section>
  )
}
