import React, {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useCallback
} from 'react'

import { OnValueChange, Props } from '../../types/types'
import { createClassName } from '../../utilities/create-class-name'
import { Stack, StackSpace } from '../stack/stack'
import styles from './radio-buttons.module.css'

const ITEM_ID_DATA_ATTRIBUTE_NAME = 'data-radio-buttons-item-id'

export type RadioButtonsProps<
  Name extends string,
  Value extends boolean | number | string
> = {
  disabled?: boolean
  name?: Name
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onValueChange?: OnValueChange<Value, Name>
  options: Array<RadioButtonsOption<Value>>
  propagateEscapeKeyDown?: boolean
  space?: StackSpace
  value: null | Value
}
export type RadioButtonsOption<
  Value extends boolean | number | string = string
> = {
  disabled?: boolean
  children?: ReactNode
  value: Value
}

export function RadioButtons<
  Name extends string,
  Value extends boolean | number | string
>({
  disabled = false,
  name,
  onChange = function () {},
  onValueChange = function () {},
  options,
  propagateEscapeKeyDown = true,
  space = 'small',
  value,
  ...rest
}: Props<HTMLInputElement, RadioButtonsProps<Name, Value>>): JSX.Element {
  const handleChange = useCallback(
    function (event: ChangeEvent<HTMLInputElement>): void {
      const id = event.currentTarget.getAttribute(
        ITEM_ID_DATA_ATTRIBUTE_NAME
      ) as string
      const newValue = options[parseInt(id, 10)].value
      onValueChange(newValue, name)
      onChange(event)
    },
    [name, onChange, onValueChange, options]
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
    <div className={styles.radioButtons}>
      <Stack space={space} direction="column">
        {options.map(function (
          option: RadioButtonsOption<Value>,
          index: number
        ): JSX.Element {
          const children =
            typeof option.children === 'undefined'
              ? `${option.value}`
              : option.children
          const isOptionDisabled = disabled === true || option.disabled === true
          return (
            <label
              key={index}
              className={createClassName([
                styles.label,
                isOptionDisabled === true ? styles.disabled : null
              ])}
            >
              <input
                {...rest}
                checked={value === option.value}
                className={styles.input}
                disabled={isOptionDisabled === true}
                name={name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                tabIndex={isOptionDisabled === true ? -1 : 0}
                type="radio"
                value={`${option.value}`}
                {...{ [ITEM_ID_DATA_ATTRIBUTE_NAME]: `${index}` }}
              />
              <div className={styles.fill} />
              <div className={styles.border} />
              <div className={styles.children}>{children}</div>
            </label>
          )
        })}
      </Stack>
    </div>
  )
}
