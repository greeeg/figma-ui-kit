import React, {
  ReactNode,
  KeyboardEvent,
  MouseEvent,
  ChangeEvent,
  RefObject,
  useCallback,
  useRef,
  useState
} from 'react'

import menuStyles from '../../css/menu.module.css'
import { useMouseDownOutside } from '../../hooks/use-mouse-down-outside'
import { useScrollableMenu } from '../../hooks/use-scrollable-menu'
import { IconControlChevronDown8 } from '../../icons/icon-8/icon-control-chevron-down-8'
import { IconMenuCheckmarkChecked16 } from '../../icons/icon-16/icon-menu-checkmark-checked-16'
import { OnValueChange, Props } from '../../types/types'
import { createClassName } from '../../utilities/create-class-name'
import { getCurrentFromRef } from '../../utilities/get-current-from-ref'
import dropdownStyles from './dropdown.module.css'
import { INVALID_ID, ITEM_ID_DATA_ATTRIBUTE_NAME } from './private/constants'
import { Id } from './private/types'
import { updateMenuElementLayout } from './private/update-menu-element-layout'

export type DropdownProps<
  Name extends string,
  Value extends boolean | number | string = string
> = {
  disabled?: boolean
  icon?: ReactNode
  name?: Name
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onValueChange?: OnValueChange<Value, Name>
  options: Array<DropdownOption<Value>>
  placeholder?: string
  value: null | Value
  variant?: DropdownVariant
}
export type DropdownOption<Value extends boolean | number | string = string> =
  | DropdownOptionHeader
  | DropdownOptionValue<Value>
  | DropdownOptionSeparator
export type DropdownOptionHeader = {
  header: string
}
export type DropdownOptionValue<Value> = {
  disabled?: boolean
  text?: string
  value: Value
}
export type DropdownOptionSeparator = {
  separator: true
}
export type DropdownVariant = 'border' | 'underline'

export function Dropdown<
  Name extends string,
  Value extends boolean | number | string = string
>({
  disabled = false,
  icon,
  name,
  options,
  onChange = function () {},
  onValueChange = function () {},
  placeholder,
  value,
  variant,
  ...rest
}: Props<HTMLDivElement, DropdownProps<Name, Value>>): JSX.Element {
  if (typeof icon === 'string' && icon.length !== 1) {
    throw new Error(`String \`icon\` must be a single character: ${icon}`)
  }

  const rootElementRef: RefObject<HTMLDivElement> = useRef(null)
  const menuElementRef: RefObject<HTMLDivElement> = useRef(null)

  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const index = findOptionIndexByValue(options, value)
  if (value !== null && index === -1) {
    throw new Error(`Invalid \`value\`: ${value}`)
  }
  const [selectedId, setSelectedId] = useState<Id>(
    index === -1 ? INVALID_ID : `${index}`
  )
  const children =
    typeof options[index] === 'undefined'
      ? ''
      : getDropdownOptionValue(options[index])

  // Uncomment to debug
  // console.table([{ isMenuVisible, selectedId }])

  const { handleScrollableMenuKeyDown, handleScrollableMenuItemMouseMove } =
    useScrollableMenu({
      itemIdDataAttributeName: ITEM_ID_DATA_ATTRIBUTE_NAME,
      menuElementRef,
      selectedId: selectedId,
      setSelectedId: setSelectedId
    })

  const triggerBlur = useCallback(function (): void {
    setIsMenuVisible(false)
    setSelectedId(INVALID_ID)
    getCurrentFromRef(rootElementRef).blur()
  }, [])

  const triggerUpdateMenuElementLayout = useCallback(function (selectedId: Id) {
    const rootElement = getCurrentFromRef(rootElementRef)
    const menuElement = getCurrentFromRef(menuElementRef)
    updateMenuElementLayout(rootElement, menuElement, selectedId)
  }, [])

  const handleRootFocus = useCallback(
    function (): void {
      // Show the menu and update the `selectedId` on focus
      setIsMenuVisible(true)
      if (value === null) {
        triggerUpdateMenuElementLayout(selectedId)
        return
      }
      const index = findOptionIndexByValue(options, value)
      if (index === -1) {
        throw new Error(`Invalid \`value\`: ${value}`)
      }
      const newSelectedId = `${index}`
      setSelectedId(newSelectedId)
      triggerUpdateMenuElementLayout(newSelectedId)
    },
    [options, selectedId, triggerUpdateMenuElementLayout, value]
  )

  const handleRootKeyDown = useCallback(
    function (event: KeyboardEvent<HTMLDivElement>): void {
      if (event.key === 'Escape' || event.key === 'Tab') {
        triggerBlur()
        return
      }
      if (event.key === 'Enter') {
        if (selectedId !== INVALID_ID) {
          const selectedElement = getCurrentFromRef(
            menuElementRef
          ).querySelector<HTMLInputElement>(
            `[${ITEM_ID_DATA_ATTRIBUTE_NAME}='${selectedId}']`
          )
          if (selectedElement === null) {
            throw new Error('Invariant violation') // `selectedId` is valid
          }
          selectedElement.checked = true
          const changeEvent = document.createEvent('Event')
          changeEvent.initEvent('change', true, true)
          selectedElement.dispatchEvent(changeEvent)
        }
        triggerBlur()
        return
      }
      handleScrollableMenuKeyDown(event)
    },
    [handleScrollableMenuKeyDown, selectedId, triggerBlur]
  )

  const handleRootMouseDown = useCallback(
    function (event: MouseEvent<HTMLDivElement>): void {
      // `mousedown` events from `menuElement` are stopped from propagating to `rootElement` by `handleMenuMouseDown`
      if (isMenuVisible === false) {
        return
      }
      event.preventDefault()
      triggerBlur()
    },
    [isMenuVisible, triggerBlur]
  )

  const handleMenuMouseDown = useCallback(function (
    event: MouseEvent<HTMLDivElement>
  ): void {
    // Stop the `mousedown` event from propagating to the `rootElement`
    event.stopPropagation()
  },
  [])

  const handleOptionChange = useCallback(
    function (event: ChangeEvent<HTMLInputElement>): void {
      const id = event.currentTarget.getAttribute(
        ITEM_ID_DATA_ATTRIBUTE_NAME
      ) as string
      const optionValue = options[
        parseInt(id, 10)
      ] as DropdownOptionValue<Value>
      const newValue = optionValue.value
      onValueChange(newValue, name)
      onChange(event)
      triggerBlur()
    },
    [name, onChange, onValueChange, options, triggerBlur]
  )

  const handleMouseDownOutside = useCallback(
    function (): void {
      if (isMenuVisible === false) {
        return
      }
      triggerBlur()
    },
    [isMenuVisible, triggerBlur]
  )
  useMouseDownOutside({
    onMouseDownOutside: handleMouseDownOutside,
    ref: rootElementRef
  })

  return (
    <div
      {...rest}
      ref={rootElementRef}
      className={createClassName([
        dropdownStyles.dropdown,
        typeof variant === 'undefined'
          ? null
          : variant === 'border'
          ? dropdownStyles.hasBorder
          : null,
        typeof icon === 'undefined' ? null : dropdownStyles.hasIcon,
        disabled === true ? dropdownStyles.disabled : null
      ])}
      onFocus={handleRootFocus}
      onKeyDown={disabled === true ? undefined : handleRootKeyDown}
      onMouseDown={handleRootMouseDown}
      tabIndex={disabled === true ? -1 : 0}
    >
      {typeof icon === 'undefined' ? null : (
        <div className={dropdownStyles.icon}>{icon}</div>
      )}
      {value === null ? (
        typeof placeholder === 'undefined' ? (
          <div className={dropdownStyles.empty} />
        ) : (
          <div
            className={createClassName([
              dropdownStyles.value,
              dropdownStyles.placeholder
            ])}
          >
            {placeholder}
          </div>
        )
      ) : (
        <div className={dropdownStyles.value}>{children}</div>
      )}
      <div className={dropdownStyles.chevronIcon}>
        <IconControlChevronDown8 />
      </div>
      {variant === 'underline' ? (
        <div className={dropdownStyles.underline} />
      ) : null}
      <div className={dropdownStyles.border} />
      <div
        ref={menuElementRef}
        className={createClassName([
          menuStyles.menu,
          dropdownStyles.menu,
          disabled === true || isMenuVisible === false
            ? menuStyles.hidden
            : null
        ])}
        onMouseDown={handleMenuMouseDown}
      >
        {options.map(function (
          option: DropdownOption<Value>,
          index: number
        ): JSX.Element {
          if ('separator' in option) {
            return <hr key={index} className={menuStyles.optionSeparator} />
          }
          if ('header' in option) {
            return (
              <h1 key={index} className={menuStyles.optionHeader}>
                {option.header}
              </h1>
            )
          }
          return (
            <label
              key={index}
              className={createClassName([
                menuStyles.optionValue,
                option.disabled === true
                  ? menuStyles.optionValueDisabled
                  : null,
                option.disabled !== true && `${index}` === selectedId
                  ? menuStyles.optionValueSelected
                  : null
              ])}
            >
              <input
                checked={value === option.value}
                className={menuStyles.input}
                disabled={option.disabled === true}
                name={name}
                // If clicked on an unselected element, set the value
                onChange={
                  value === option.value ? undefined : handleOptionChange
                }
                // Else blur if clicked on an already-selected element
                onClick={value === option.value ? triggerBlur : undefined}
                onMouseMove={handleScrollableMenuItemMouseMove}
                tabIndex={-1}
                type="radio"
                value={`${option.value}`}
                {...{ [ITEM_ID_DATA_ATTRIBUTE_NAME]: `${index}` }}
              />
              {option.value === value ? (
                <div className={menuStyles.checkIcon}>
                  <IconMenuCheckmarkChecked16 />
                </div>
              ) : null}
              {typeof option.text === 'undefined' ? option.value : option.text}
            </label>
          )
        })}
      </div>
    </div>
  )
}

function getDropdownOptionValue<
  Value extends boolean | number | string = string
>(option: DropdownOption<Value>): ReactNode {
  if ('text' in option) {
    return option.text
  }
  if ('value' in option) {
    return option.value
  }
  throw new Error('Invariant violation')
}

// Returns the index of the option in `options` with the given `value`, else `-1`
function findOptionIndexByValue<
  Value extends boolean | number | string = string
>(options: Array<DropdownOption<Value>>, value: null | Value): number {
  if (value === null) {
    return -1
  }
  let index = 0
  for (const option of options) {
    if ('value' in option && option.value === value) {
      return index
    }
    index += 1
  }
  return -1
}
