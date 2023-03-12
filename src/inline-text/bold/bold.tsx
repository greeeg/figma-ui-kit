import React, { ReactNode } from 'react'

import { Props } from '../../types/types'
import styles from './bold.module.css'

export type BoldProps = {
  children: ReactNode
}

export function Bold({
  children,
  ...rest
}: Props<HTMLSpanElement, BoldProps>): JSX.Element {
  return (
    <strong {...rest} className={styles.bold}>
      {children}
    </strong>
  )
}
