import React, { useCallback, ChangeEvent, ReactNode, KeyboardEvent, Fragment } from 'react'

import { OnValueChange, Props } from '../../types/types'
import styles from './tabs.module.css'

const ITEM_ID_DATA_ATTRIBUTE_NAME = 'data-tabs-item-id'

export type TabsProps<Name extends string> = {
  name?: Name
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onValueChange?: OnValueChange<string, Name>
  options: Array<TabsOption>
  propagateEscapeKeyDown?: boolean
  value: null | string
}
export type TabsOption = {
  children: ReactNode
  value: string
}

export function Tabs<Name extends string>({
  name,
  onChange = function () {},
  onValueChange = function () {},
  options,
  propagateEscapeKeyDown = true,
  value,
  ...rest
}: Props<HTMLInputElement, TabsProps<Name>>): JSX.Element {
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

  const activeOption = options.find(function (option: TabsOption): boolean {
    return option.value === value
  })

  return (
    <Fragment>
      <div className={styles.tabs}>
        {options.map(function (option: TabsOption, index: number): JSX.Element {
          return (
            <label key={index} className={styles.label}>
              <input
                {...rest}
                checked={value === option.value}
                className={styles.input}
                name={name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                type="radio"
                value={option.value}
                {...{ [ITEM_ID_DATA_ATTRIBUTE_NAME]: `${index}` }}
              />
              <div className={styles.value}>{option.value}</div>
            </label>
          )
        })}
      </div>
      {typeof activeOption === 'undefined' ? null : (
        <div className={styles.children}>{activeOption.children}</div>
      )}
    </Fragment>
  )
}
