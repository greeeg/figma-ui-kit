import React, { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent, useCallback, useRef, useState } from 'react'

import { OnValueChange, Props } from '../../../../types/types'
import { getCurrentFromRef } from '../../../../utilities/get-current-from-ref'
import { MIXED_STRING } from '../../../../utilities/private/mixed-values'
import { isKeyCodeCharacterGenerating } from '../../private/is-keycode-character-generating'

const EMPTY_STRING = ''

export type RawTextboxProps<Name extends string> = {
  disabled?: boolean
  name?: Name
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void
  onValueInput?: OnValueChange<string, Name>
  password?: boolean
  placeholder?: string
  propagateEscapeKeyDown?: boolean
  revertOnEscapeKeyDown?: boolean
  spellCheck?: boolean
  validateOnBlur?: (value: string) => string | boolean
  value: string
}

export function RawTextbox<Name extends string>({
  disabled = false,
  name,
  onInput = function () {},
  onValueInput = function () {},
  password = false,
  placeholder,
  propagateEscapeKeyDown = true,
  revertOnEscapeKeyDown = false,
  spellCheck = false,
  validateOnBlur,
  value,
  ...rest
}: Props<HTMLInputElement, RawTextboxProps<Name>>): JSX.Element {
  const inputElementRef = useRef<HTMLInputElement>(null)
  const revertOnEscapeKeyDownRef = useRef(false) // Boolean flag to exit early from `handleBlur`

  const [originalValue, setOriginalValue] = useState(EMPTY_STRING) // Value of the textbox when it was initially focused

  const setInputElementValue = useCallback(function (value: string): void {
    const inputElement = getCurrentFromRef(inputElementRef)
    inputElement.value = value
    const inputEvent = document.createEvent('Event')
    inputEvent.initEvent('input', true, true)
    inputElement.dispatchEvent(inputEvent)
  }, [])

  const handleBlur = useCallback(
    function (): void {
      if (revertOnEscapeKeyDownRef.current === true) {
        revertOnEscapeKeyDownRef.current = false
        return
      }
      if (typeof validateOnBlur !== 'undefined') {
        const result = validateOnBlur(value)
        if (typeof result === 'string') {
          // Set to the value returned by `validateOnBlur`
          setInputElementValue(result)
          setOriginalValue(EMPTY_STRING)
          return
        }
        if (result === false) {
          // Revert the original value
          if (value !== originalValue) {
            setInputElementValue(originalValue)
          }
          setOriginalValue(EMPTY_STRING)
          return
        }
      }
      setOriginalValue(EMPTY_STRING)
    },
    [originalValue, setInputElementValue, validateOnBlur, value]
  )

  const handleFocus = useCallback(
    function (event: FocusEvent<HTMLInputElement>): void {
      setOriginalValue(value)
      event.currentTarget.select()
    },
    [value]
  )

  const handleInput = useCallback(
    function (event: ChangeEvent<HTMLInputElement>): void {
      onValueInput(event.currentTarget.value, name)
      onInput(event)
    },
    [name, onInput, onValueInput]
  )

  const handleKeyDown = useCallback(
    function (event: KeyboardEvent<HTMLInputElement>): void {
      const key = event.key
      if (key === 'Escape') {
        if (propagateEscapeKeyDown === false) {
          event.stopPropagation()
        }
        if (revertOnEscapeKeyDown === true) {
          revertOnEscapeKeyDownRef.current = true
          setInputElementValue(originalValue)
          setOriginalValue(EMPTY_STRING)
        }
        event.currentTarget.blur()
        return
      }
      if (key === 'Enter') {
        event.currentTarget.blur()
        return
      }
      if (
        value === MIXED_STRING &&
        isKeyCodeCharacterGenerating(event.keyCode) === false
      ) {
        // Prevent changing the cursor position with the keyboard if `value` is `MIXED_STRING`
        event.preventDefault()
        event.currentTarget.select()
      }
    },
    [
      originalValue,
      propagateEscapeKeyDown,
      revertOnEscapeKeyDown,
      setInputElementValue,
      value
    ]
  )

  const handleMouseUp = useCallback(
    function (event: MouseEvent<HTMLInputElement>): void {
      if (value === MIXED_STRING) {
        // Prevent changing the selection if `value` is `MIXED_STRING`
        event.preventDefault()
      }
    },
    [value]
  )

  return (
    <input
      {...rest}
      ref={inputElementRef}
      disabled={disabled === true}
      name={name}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onMouseUp={handleMouseUp}
      placeholder={placeholder}
      spellCheck={spellCheck}
      tabIndex={disabled === true ? -1 : 0}
      type={password === true ? 'password' : 'text'}
      value={value === MIXED_STRING ? 'Mixed' : value}
    />
  )
}
