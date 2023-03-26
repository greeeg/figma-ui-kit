# Figma UI kit

> A set of React components that replicate the Figma UI for plugins

## The problem

As stated by the Figma team in their developers docs, _it's good practice to make a plugin's UI consistent, to the degree that it is possible, with the rest of the Figma UI. This almost always leads to a better experience for users_.

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

import 'figma-ui-kit/lib/css/theme.css'
import 'figma-ui-kit/lib/css/base.css'
import 'figma-ui-kit/lib/css/menu.module.css'

const App = () => {
  return (
    <div className="figma-light">
      <Stack direction="column" space="medium">
        <Text>Hello Figma plugin</Text>

        <Stack direction="row" space="small">
          <Button>Get started</Button>
          <Button secondary>Go back</Button>
        </Stack>
      </Stack>
    </div>
  )
}
```

## Supported components

- Box
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
- Properties section
- Radio buttons
- Range slider
- Search textbox
- Section
- Segmented control
- Selectable item
- Stack
- Tabs
- Text
- Textbox
- Toggle
