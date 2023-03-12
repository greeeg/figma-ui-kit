import React, { ReactNode } from 'react'

import { Props } from '../../types/types'
import { createClassName } from '../../utilities/create-class-name'
import styles from './banner.module.css'

export type BannerProps = {
  children: ReactNode
  icon: ReactNode
  variant?: BannerVariant
}
export type BannerVariant = 'success' | 'warning'

export function Banner({
  children,
  icon,
  variant,
  ...rest
}: Props<HTMLDivElement, BannerProps>) {
  return (
    <div
      {...rest}
      className={createClassName([
        styles.banner,
        typeof variant === 'undefined' ? null : styles[variant]
      ])}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.children}>{children}</div>
    </div>
  )
}
