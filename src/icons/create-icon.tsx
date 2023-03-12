import React from 'react'

import { IconColor } from '../types/colors'
import { Props } from '../types/types'
import styles from './icon.module.css'

export type IconProps = {
  color?: IconColor
}

export function createIcon(
  path: string,
  options: { width: number; height: number }
): (props: Props<SVGSVGElement, IconProps>) => JSX.Element {
  const { width, height } = options
  return function Icon({
    color,
    ...rest
  }: Props<SVGSVGElement, IconProps>): JSX.Element {
    return (
      <svg
        {...rest}
        className={styles.icon}
        height={height}
        style={
          typeof color === 'undefined'
            ? undefined
            : {
                fill: `var(--figma-color-icon-${color})`
              }
        }
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path clipRule="evenodd" d={path} fillRule="evenodd" />
      </svg>
    )
  }
}
