import { HTMLAttributes } from 'react'

export type OnValueChange<Value, Name extends string> = (
  newValue: Value,
  name?: Name
) => void

export type Props<
  Target extends EventTarget = EventTarget,
  ComponentProps = Record<string, never>
> = Omit<HTMLAttributes<Target>, keyof ComponentProps> & ComponentProps
