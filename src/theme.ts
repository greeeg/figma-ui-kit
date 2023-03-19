import { createStitches } from '@stitches/react'

const customTheme = {
  colors: {},
  space: {
    extraSmall: '8px',
    small: '12px',
    medium: '16px',
    large: '20px',
    extraLarge: '24px'
  },
  fontSizes: {},
  fonts: {},
  fontWeights: {},
  lineHeights: {},
  letterSpacings: {},
  sizes: {},
  borderWidths: {},
  borderStyles: {},
  radii: {
    radius100: '2px',
    radius200: '6px'
  },
  shadows: {
    shadow:
      '0 5px 17px rgba(0, 0, 0, 0.2), 0 2px 7px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #000000, 0 0 0 0.5px rgba(0, 0, 0, 0.1)',
    shadowMenu:
      '0 5px 17px rgba(0, 0, 0, 0.2), 0 2px 7px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #000000, 0 0 0 0.5px rgba(0, 0, 0, 0.1)',
    shadowModal:
      '0 2px 14px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, 0.2)'
  },
  zIndices: {},
  transitions: {}
}

export type SpaceValue = `$${keyof typeof customTheme.space}`

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config
} = createStitches({
  utils: {
    marginY: (value: SpaceValue | string | number) => ({
      marginTop: value,
      marginBottom: value
    }),
    marginX: (value: SpaceValue | string | number) => ({
      marginLeft: value,
      marginRight: value
    }),
    paddingY: (value: SpaceValue | string | number) => ({
      paddingTop: value,
      paddingBottom: value
    }),
    paddingX: (value: SpaceValue | string | number) => ({
      paddingLeft: value,
      paddingRight: value
    })
  },
  theme: customTheme,
  media: {}
})
