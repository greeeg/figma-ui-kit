import React, { ReactNode } from 'react'

import { Props } from '../../types/types'
import styles from './muted.module.css'

export type MutedProps = {
  children: ReactNode
}

export function Muted({
  children,
  ...rest
}: Props<HTMLSpanElement, MutedProps>): JSX.Element {
  return (
    <span {...rest} className={styles.muted}>
      {children}
    </span>
  )
}
