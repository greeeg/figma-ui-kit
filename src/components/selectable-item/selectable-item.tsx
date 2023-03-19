import React, {
  ReactNode,
  useCallback,
  ChangeEvent,
  KeyboardEvent
} from 'react'

import { IconMenuCheckmarkChecked16 } from '../../icons/icon-16/icon-menu-checkmark-checked-16'
import { OnValueChange, Props } from '../../types/types'
import { createClassName } from '../../utilities/create-class-name'
import styles from './selectable-item.module.css'

export type SelectableItemProps<Name extends string> = {
  bold?: boolean
  children: ReactNode
  disabled?: boolean
  indent?: boolean
  name?: Name
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onValueChange?: OnValueChange<boolean, Name>
  propagateEscapeKeyDown?: boolean
  value: boolean
}

export function SelectableItem<Name extends string>({
  bold = false,
  children,
  disabled = false,
  indent = false,
  name,
  onChange = function () {},
  onValueChange = function () {},
  propagateEscapeKeyDown = true,
  value,
  ...rest
}: Props<HTMLInputElement, SelectableItemProps<Name>>): JSX.Element {
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
        styles.selectableItem,
        disabled === true ? styles.disabled : null,
        bold === true ? styles.bold : null,
        indent === true ? styles.indent : null
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
      <div className={styles.box} />
      <div className={styles.children}>{children}</div>
      {value === true ? (
        <div className={styles.icon}>
          <IconMenuCheckmarkChecked16 />
        </div>
      ) : null}
    </label>
  )
}
