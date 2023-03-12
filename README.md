# Figma UI kit

> A set of React components that replicate the Figma UI for plugins

## The problem

As stated by the Figma team in their developers docs, *it's good practice to make a plugin's UI consistent, to the degree that it is possible, with the rest of the Figma UI. This almost always leads to a better experience for users*.

However, there's no official set of React components to quickly build Figma plugins.

This project is a fork of [@yuanqinglim](https://twitter.com/yuanqinglim) awesome work on [`create-figma-plugin`](https://github.com/yuanqing/create-figma-plugin).

It intends to extract the UI aspect of it while making it compatible with React.js (originally made with Preact).

## Getting started

```sh
yarn add figma-ui-kit
```

```tsx
import React from 'react'
import { Stack, Text, Button } from 'figma-ui-kit'

import 'figma-ui-kit/lib/css/base.css'

const App = () => {
  return (
    <Stack direction="column" space="medium">
      <Text>Hello Figma plugin</Text>
      <Button>Get started</Button>
    </Stack>
  )
}

```

## Supported components

- Banner
- Button
- Checkbox
- Disclosure
- Divider
- Dropdown
- File upload
- Icon
- Icon button
- Icon toggle button
- Layer
- Loading indicator
- Preview
- Radio buttons
- Range slider
- Search textbox
- Segmented control
- Selectable item
- Stack
- Tabs
- Text
- Textbox
- Toggle
