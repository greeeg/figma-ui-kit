import React, {
  MouseEventHandler,
  ReactNode,
  useCallback,
  KeyboardEvent
} from 'react'

import { Props } from '../../types/types'
import { createClassName } from '../../utilities/create-class-name'
import { LoadingIndicator } from '../loading-indicator/loading-indicator'
import styles from './button.module.css'

export type ButtonProps = {
  children: ReactNode
  danger?: boolean
  disabled?: boolean
  fullWidth?: boolean
  loading?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  propagateEscapeKeyDown?: boolean
  secondary?: boolean
}

export function Button({
  children,
  danger = false,
  disabled = false,
  fullWidth = false,
  loading = false,
  onClick,
  propagateEscapeKeyDown = true,
  secondary = false,
  ...rest
}: Props<HTMLButtonElement, ButtonProps>): JSX.Element {
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
    <div
      className={createClassName([
        styles.button,
        secondary === true ? styles.secondary : styles.default,
        danger === true ? styles.danger : null,
        fullWidth === true ? styles.fullWidth : null,
        disabled === true ? styles.disabled : null,
        loading === true ? styles.loading : null
      ])}
    >
      {loading === true ? (
        <div className={styles.loadingIndicator}>
          <LoadingIndicator />
        </div>
      ) : null}
      <button
        {...rest}
        disabled={disabled === true}
        onClick={disabled === true || loading === true ? undefined : onClick}
        onKeyDown={
          disabled === true || loading === true ? undefined : handleKeyDown
        }
        tabIndex={disabled === true ? -1 : 0}
      >
        <div className={styles.children}>{children}</div>
      </button>
    </div>
  )
}
