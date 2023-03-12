import React, { ReactNode } from 'react'

import { Props } from '../../types/types'
import styles from './code.module.css'

export type CodeProps = {
  children: ReactNode
}

export function Code({
  children,
  ...rest
}: Props<HTMLSpanElement, CodeProps>): JSX.Element {
  return (
    <code {...rest} className={styles.code}>
      {children}
    </code>
  )
}
