import React, { ReactNode } from 'react'

import { Props } from '../../../types/types'
import { createClassName } from '../../../utilities/create-class-name'
import textboxStyles from '../textbox/textbox.module.css'
import {
  RawTextboxNumeric,
  RawTextboxNumericProps
} from './private/raw-textbox-numeric'
import textboxNumericStyles from './textbox-numeric.module.css'

export type TextboxNumericProps<Name extends string> =
  RawTextboxNumericProps<Name> & {
    icon?: ReactNode
    variant?: TextboxNumericVariant
  }

export type TextboxNumericVariant = 'border' | 'underline'

export function TextboxNumeric<Name extends string>({
  icon,
  variant,
  ...rest
}: Props<HTMLInputElement, TextboxNumericProps<Name>>): JSX.Element {
  if (typeof icon === 'string' && icon.length !== 1) {
    throw new Error(`String \`icon\` must be a single character: ${icon}`)
  }

  return (
    <div
      className={createClassName([
        textboxStyles.textbox,
        typeof variant === 'undefined'
          ? null
          : variant === 'border'
          ? textboxStyles.hasBorder
          : null,
        typeof icon === 'undefined' ? null : textboxStyles.hasIcon,
        rest.disabled === true ? textboxStyles.disabled : null
      ])}
    >
      <RawTextboxNumeric
        {...rest}
        className={createClassName([
          textboxStyles.input,
          textboxNumericStyles.input
        ])}
      />
      {typeof icon === 'undefined' ? null : (
        <div className={textboxStyles.icon}>{icon}</div>
      )}
      <div className={textboxStyles.border} />
      {variant === 'underline' ? (
        <div className={textboxStyles.underline} />
      ) : null}
    </div>
  )
}
