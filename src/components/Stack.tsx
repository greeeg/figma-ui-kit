import { CSSProperties } from '@stitches/react'
import React, { FC, ReactNode, useMemo } from 'react'
import { SpaceValue, styled } from '../theme'

interface StackProps
  extends Pick<
    CSSProperties,
    | 'width'
    | 'maxWidth'
    | 'alignItems'
    | 'flexGrow'
    | 'flexWrap'
    | 'justifyContent'
    | 'paddingBottom'
    | 'paddingLeft'
    | 'paddingRight'
    | 'paddingTop'
    | 'marginBottom'
    | 'marginLeft'
    | 'marginRight'
    | 'marginTop'
    | 'height'
  > {
  className?: string
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  renderAs?: keyof JSX.IntrinsicElements
  spacing?: SpaceValue
  paddingX?: SpaceValue
  paddingY?: SpaceValue
  children: ReactNode
}

export const Stack: FC<StackProps> = ({
  renderAs = 'div',
  direction,
  className,
  spacing = '$space0',
  children,
  ...props
}) => {
  const Component = useMemo(
    () =>
      styled(renderAs, {
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing,
        variants: {
          direction: {
            'row': {
              flexDirection: 'row'
            },
            'column': {
              flexDirection: 'column'
            },
            'row-reverse': {
              flexDirection: 'row-reverse'
            },
            'column-reverse': {
              flexDirection: 'column-reverse'
            }
          }
        }
      }),
    [renderAs, spacing]
  )

  return (
    <Component direction={direction} css={props} className={className}>
      {children}
    </Component>
  )
}
