import React from 'react'
import { createRoot } from 'react-dom/client'

import Router from '@/main/routes/router'

import '@/presentation/styles/global.scss'

createRoot(document.getElementById('main')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
