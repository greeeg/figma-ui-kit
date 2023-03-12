import React, { ReactNode } from 'react'

import { Props } from '../../types/types'
import { createClassName } from '../../utilities/create-class-name'
import styles from './link.module.css'

export type LinkProps = {
  children: ReactNode
  fullWidth?: boolean
  href: string
  target?: string
}

export function Link({
  children,
  fullWidth = false,
  href,
  target,
  ...rest
}: Props<HTMLAnchorElement, LinkProps>): JSX.Element {
  return (
    <a
      {...rest}
      className={createClassName([
        styles.link,
        fullWidth === true ? styles.fullWidth : null
      ])}
      href={href}
      target={typeof target === 'undefined' ? undefined : target}
    >
      {children}
    </a>
  )
}
