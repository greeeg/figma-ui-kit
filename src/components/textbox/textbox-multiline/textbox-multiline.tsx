import React, { useCallback, useRef, useState, RefObject, ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent } from 'react'

import { OnValueChange, Props } from '../../../types/types'
import { createClassName } from '../../../utilities/create-class-name'
import { getCurrentFromRef } from '../../../utilities/get-current-from-ref'
import { MIXED_STRING } from '../../../utilities/private/mixed-values'
import { isKeyCodeCharacterGenerating } from '../private/is-keycode-character-generating'
import styles from './textbox-multiline.module.css'

const EMPTY_STRING = ''

export type TextboxMultilineProps<Name extends string> = {
  grow?: boolean
  disabled?: boolean
  name?: Name
  onInput?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onValueInput?: OnValueChange<string, Name>
  placeholder?: string
  propagateEscapeKeyDown?: boolean
  revertOnEscapeKeyDown?: boolean
  rows?: number
  spellCheck?: boolean
  validateOnBlur?: (value: string) => string | boolean
  value: string
  variant?: TextboxMultilineVariant
}

export type TextboxMultilineVariant = 'border' | 'underline'

export function TextboxMultiline<Name extends string>({
  grow = false,
  disabled = false,
  name,
  onInput = function () {},
  onValueInput = function () {},
  placeholder,
  propagateEscapeKeyDown = true,
  revertOnEscapeKeyDown = false,
  rows = 3,
  spellCheck = false,
  validateOnBlur,
  variant,
  value,
  ...rest
}: Props<HTMLTextAreaElement, TextboxMultilineProps<Name>>): JSX.Element {
  const textAreaElementRef = useRef<HTMLTextAreaElement>(null)
  const revertOnEscapeKeyDownRef = useRef(false) // Boolean flag to exit early from `handleBlur`

  const [originalValue, setOriginalValue] = useState(EMPTY_STRING) // Value of the textbox when it was initially focused

  const setTextAreaElementValue = useCallback(function (value: string): void {
    const textAreaElement = getCurrentFromRef(textAreaElementRef)
    textAreaElement.value = value
    const inputEvent = document.createEvent('Event')
    inputEvent.initEvent('input', true, true)
    textAreaElement.dispatchEvent(inputEvent)
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
          setTextAreaElementValue(result)
          setOriginalValue(EMPTY_STRING)
          return
        }
        if (result === false) {
          // Revert the original value
          if (value !== originalValue) {
            setTextAreaElementValue(originalValue)
          }
          setOriginalValue(EMPTY_STRING)
          return
        }
      }
      setOriginalValue(EMPTY_STRING)
    },
    [originalValue, setTextAreaElementValue, validateOnBlur, value]
  )

  const handleFocus = useCallback(
    function (event: FocusEvent<HTMLTextAreaElement>): void {
      setOriginalValue(value)
      event.currentTarget.select()
    },
    [value]
  )

  const handleInput = useCallback(
    function (event: ChangeEvent<HTMLTextAreaElement>): void {
      onValueInput(event.currentTarget.value, name)
      onInput(event)
    },
    [name, onInput, onValueInput]
  )

  const handleKeyDown = useCallback(
    function (event: KeyboardEvent<HTMLTextAreaElement>): void {
      if (event.key === 'Escape') {
        if (propagateEscapeKeyDown === false) {
          event.stopPropagation()
        }
        if (revertOnEscapeKeyDown === true) {
          revertOnEscapeKeyDownRef.current = true
          setTextAreaElementValue(originalValue)
          setOriginalValue(EMPTY_STRING)
        }
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
      setTextAreaElementValue,
      value
    ]
  )

  const handleMouseUp = useCallback(
    function (event: MouseEvent<HTMLTextAreaElement>): void {
      if (value === MIXED_STRING) {
        // Prevent changing the selection if `value` is `MIXED_STRING`
        event.preventDefault()
      }
    },
    [value]
  )

  return (
    <div
      className={createClassName([
        styles.textboxMultiline,
        typeof variant === 'undefined'
          ? null
          : variant === 'border'
          ? styles.hasBorder
          : null,
        grow === true ? styles.grow : null,
        disabled === true ? styles.disabled : null
      ])}
    >
      {grow === true ? (
        <div className={styles.ghost}>
          {value === MIXED_STRING ? 'Mixed' : `${value} `}
        </div>
      ) : null}
      <textarea
        {...rest}
        ref={textAreaElementRef}
        className={styles.textarea}
        disabled={disabled === true}
        name={name}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onMouseUp={handleMouseUp}
        placeholder={placeholder}
        rows={rows}
        spellCheck={spellCheck}
        tabIndex={disabled === true ? -1 : 0}
        value={value === MIXED_STRING ? 'Mixed' : value}
      />
      <div className={styles.border} />
      {variant === 'underline' ? <div className={styles.underline} /> : null}
    </div>
  )
}
