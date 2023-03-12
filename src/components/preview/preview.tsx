import React, { ReactNode } from 'react'

import { Props } from '../../types/types'
import style from './preview.module.css'

export type PreviewProps = {
  children: ReactNode
}

export function Preview({
  children,
  ...rest
}: Props<HTMLDivElement, PreviewProps>): JSX.Element {
  return (
    <div {...rest} className={style.preview}>
      {children}
    </div>
  )
}
