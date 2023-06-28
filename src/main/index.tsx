import React from 'react'
import { createRoot } from 'react-dom/client'

import { Router } from '@/presentation/components'

import '@/presentation/styles/global.scss'

createRoot(document.getElementById('main') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
