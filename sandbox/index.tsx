import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './src/App'

import '../src/css/theme.css'
import '../src/css/base.css'
import '../src/css/menu.module.css'

const container = document.getElementById('app')!
const root = createRoot(container)
root.render(<App />)
