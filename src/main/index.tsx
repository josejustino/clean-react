import React from 'react'
import { createRoot } from 'react-dom/client'

import { Router } from '@/presentation/components'

createRoot(document.getElementById('main') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
