import React, { ReactNode } from 'react'

import { Props } from '../../types/types'
import { createClassName } from '../../utilities/create-class-name'
import styles from './stack.module.css'

export type StackProps = {
  direction: 'column' | 'row'
  alignItems?: 'center' | 'flex-start' | 'flex-end'
  justifyContent?: 'center' | 'flex-start' | 'flex-end'
  children: ReactNode
  space: StackSpace
}
export type StackSpace =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge'

export function Stack({
  children,
  direction,
  alignItems,
  justifyContent,
  space,
  ...rest
}: Props<HTMLDivElement, StackProps>): JSX.Element {
  return (
    <div {...rest} className={createClassName([
      styles.stack,
      styles[space],
      styles[direction],
      alignItems ? styles[`align-items-${alignItems}`] : null,
      justifyContent ? styles[`justify-content-${justifyContent}`] : null,
    ])}>
      {children}
    </div>
  )
}