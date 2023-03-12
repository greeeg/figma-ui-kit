import React, { ChangeEvent, KeyboardEvent, ReactNode, useCallback } from 'react'

import { OnValueChange, Props } from '../../types/types'
import { createClassName } from '../../utilities/create-class-name'
import styles from './layer.module.css'

export type LayerProps<Name extends string> = {
  bold?: boolean
  children: ReactNode
  component?: boolean
  description?: string
  icon: ReactNode
  name?: Name
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onValueChange?: OnValueChange<boolean, Name>
  propagateEscapeKeyDown?: boolean
  value: boolean
}

export function Layer<Name extends string>({
  bold = false,
  children,
  description,
  component = false,
  icon,
  name,
  onChange = function () {},
  onValueChange = function () {},
  propagateEscapeKeyDown = true,
  value,
  ...rest
}: Props<HTMLInputElement, LayerProps<Name>>): JSX.Element {
  const handleChange = useCallback(
    function (event: ChangeEvent<HTMLInputElement>): void {
      const newValue = event.currentTarget.checked
      onValueChange(newValue, name)
      onChange(event)
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
        styles.layer,
        bold === true ? styles.bold : null,
        component === true ? styles.component : null
      ])}
    >
      <input
        {...rest}
        checked={value === true}
        className={styles.input}
        name={name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        type="checkbox"
      />
      <div className={styles.box} />
      <div className={styles.icon}>{icon}</div>
      <div className={styles.children}>{children}</div>
      {typeof description === 'undefined' ? null : (
        <div className={styles.description}>{description}</div>
      )}
    </label>
  )
}
