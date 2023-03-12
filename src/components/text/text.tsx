import React, { ReactNode } from 'react'

import { Props } from '../../types/types'
import { createClassName } from '../../utilities/create-class-name'
import styles from './text.module.css'

export type TextProps = {
  align?: TextAlignment
  children: ReactNode
  numeric?: boolean
}
export type TextAlignment = 'left' | 'center' | 'right'

export function Text({
  align = 'left',
  children,
  numeric = false,
  ...rest
}: Props<HTMLDivElement, TextProps>): JSX.Element {
  return (
    <div
      {...rest}
      className={createClassName([
        styles.text,
        styles[align],
        numeric === true ? styles.numeric : null
      ])}
    >
      {children}
    </div>
  )
}
