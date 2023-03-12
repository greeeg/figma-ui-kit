export const floatOperandRegex = /^-?\d*(?:\.\d*)?$/
export const integerOperandRegex = /^-?\d*$/
export const operatorRegex = /[+\-*/]/
export const operatorSuffixRegex = /[+\-*/]$/
export const numbersRegex = /\d/
export const invalidCharactersRegex = /[^\d.+\-*/]/

/**
 * Evaluates the given numeric `expression`.
 *
 * @returns Returns the result of evaluating the given numeric `expression`,
 * else `null` for an invalid expression.
 * @category Number
 */
export function evaluateNumericExpression(value: string): null | number {
  if (
    value === '' ||
    numbersRegex.test(value) === false ||
    invalidCharactersRegex.test(value) === true
  ) {
    return null
  }
  if (operatorRegex.test(value) === true) {
    if (operatorSuffixRegex.test(value) === true) {
      // Drop the operator suffix
      return eval(value.substring(0, value.length - 1)) // eslint-disable-line no-eval
    }
    return eval(value) // eslint-disable-line no-eval
  }
  return parseFloat(value)
}

/**
 * Checks if `value` is a numeric expression, as input by a user. “Partial”
 * inputs are considered valid.
 *
 * @param options.integersOnly  Set to `true` to check that the expression
 * contains only integers. Defaults to `false`.
 * @returns Returns `true` if `value` is a valid numeric expression,
 * else `false`.
 * @category Number
 */
export function isValidNumericInput(
  value: string,
  options: { integersOnly: boolean } = { integersOnly: false }
): boolean {
  const split = (value[0] === '-' ? value.substring(1) : value).split(
    operatorRegex
  )
  let i = -1
  while (++i < split.length) {
    const operand = split[i]
    if (
      (operand === '' && i !== split.length - 1) ||
      (options.integersOnly === true
        ? integerOperandRegex
        : floatOperandRegex
      ).test(operand) === false
    ) {
      return false
    }
  }
  return true
}
