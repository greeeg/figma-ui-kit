import React, {
  ReactNode,
  MouseEventHandler,
  useCallback,
  KeyboardEvent,
  Fragment
} from 'react'

import { IconCaretRight16 } from '../../icons/icon-16/icon-caret-right-16'
import { Props } from '../../types/types'
import styles from './disclosure.module.css'

export type DisclosureProps = {
  children: ReactNode
  onClick: MouseEventHandler<HTMLInputElement>
  open: boolean
  propagateEscapeKeyDown?: boolean
  title: string
}

export function Disclosure({
  children,
  onClick,
  open,
  propagateEscapeKeyDown = true,
  title,
  ...rest
}: Props<HTMLInputElement, DisclosureProps>): JSX.Element {
  const handleKeyDown = useCallback(
    function (event: KeyboardEvent<HTMLInputElement>): void {
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
    <Fragment>
      <label className={styles.label}>
        <input
          {...rest}
          checked={open === true}
          className={styles.input}
          onClick={onClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          type="checkbox"
        />
        <div className={styles.title}>
          <div className={styles.icon}>
            <IconCaretRight16 />
          </div>
          {title}
        </div>
      </label>
      {open === true ? <div className={styles.children}>{children}</div> : null}
    </Fragment>
  )
}
