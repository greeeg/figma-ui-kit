import React, {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useCallback
} from 'react'

import { OnValueChange, Props } from '../../types/types'
import { createClassName } from '../../utilities/create-class-name'
import styles from './icon-toggle-button.module.css'

export type IconToggleButtonProps<Name extends string> = {
  children: ReactNode
  disabled?: boolean
  name?: Name
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onValueChange?: OnValueChange<boolean, Name>
  propagateEscapeKeyDown?: boolean
  value: boolean
}

export function IconToggleButton<Name extends string>({
  children,
  disabled = false,
  name,
  onChange = function () {},
  onValueChange = function () {},
  propagateEscapeKeyDown = true,
  value,
  ...rest
}: Props<HTMLInputElement, IconToggleButtonProps<Name>>): JSX.Element {
  const handleChange = useCallback(
    function (event: ChangeEvent<HTMLInputElement>): void {
      onValueChange(!value, name)
      onChange(event)
    },
    [name, onChange, onValueChange, value]
  )

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
    <label
      className={createClassName([
        styles.iconToggleButton,
        disabled === true ? styles.disabled : null
      ])}
    >
      <input
        {...rest}
        checked={value === true}
        className={styles.input}
        disabled={disabled === true}
        name={name}
        onChange={handleChange}
        onKeyDown={disabled === true ? undefined : handleKeyDown}
        tabIndex={disabled === true ? -1 : 0}
        type="checkbox"
      />
      <div className={styles.box}>
        <div className={styles.icon}>{children}</div>
      </div>
    </label>
  )
}
