import React, { ReactNode, useCallback, KeyboardEvent, ChangeEvent } from 'react'

import { IconControlCheckboxChecked12 } from '../../icons/icon-12/icon-control-checkbox-checked-12'
import { OnValueChange, Props } from '../../types/types'
import { createClassName } from '../../utilities/create-class-name'
import styles from './checkbox.module.css'

export type CheckboxProps<Name extends string> = {
  children: ReactNode
  disabled?: boolean
  name?: Name
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onValueChange?: OnValueChange<boolean, Name>
  propagateEscapeKeyDown?: boolean
  value: boolean
}

export function Checkbox<Name extends string>({
  children,
  disabled = false,
  name,
  onChange,
  onValueChange = function () {},
  propagateEscapeKeyDown = true,
  value = false,
  ...rest
}: Props<HTMLInputElement, CheckboxProps<Name>>): JSX.Element {
  const handleChange = useCallback(
    function (event: ChangeEvent<HTMLInputElement>): void {
      const newValue = event.currentTarget.checked
      onValueChange(newValue, name)
      onChange?.(event)
    },
    [name, onChange, onValueChange]
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
        styles.checkbox,
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
        onKeyDown={handleKeyDown}
        tabIndex={disabled === true ? -1 : 0}
        type="checkbox"
      />
      <div className={styles.fill}>
        {value === true ? (
          <div className={styles.checkIcon}>
            <IconControlCheckboxChecked12 />
          </div>
        ) : null}
      </div>
      <div className={styles.border} />
      <div className={styles.children}>{children}</div>
    </label>
  )
}
