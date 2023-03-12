import React, { ReactNode, MouseEventHandler, useCallback, KeyboardEvent } from 'react'

import { Props } from '../../types/types'
import styles from './icon-button.module.css'

export type IconButtonProps = {
  children: ReactNode
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  propagateEscapeKeyDown?: boolean
}

export function IconButton({
  children,
  disabled = false,
  onClick,
  propagateEscapeKeyDown = true,
  ...rest
}: Props<HTMLButtonElement, IconButtonProps>): JSX.Element {
  const handleKeyDown = useCallback(
    function (event: KeyboardEvent<HTMLButtonElement>): void {
      if (event.key !== 'Escape') {
        return
      }
      if (propagateEscapeKeyDown === false) {
        event.stopPropagation()
      }
      event.currentTarget.blur()
    },
    [propagateEscapeKeyDown]
  )

  return (
    <button
      {...rest}
      className={styles.iconButton}
      disabled={disabled === true}
      onClick={disabled === true ? undefined : onClick}
      onKeyDown={disabled === true ? undefined : handleKeyDown}
      tabIndex={disabled === true ? -1 : 0}
    >
      <div className={styles.icon}>{children}</div>
    </button>
  )
}
