import React from 'react'
import { createRoot } from 'react-dom/client'

import { Router } from '@/presentation/components'

import '@/presentation/styles/global.scss'
import { makeLogin as MakeLogin } from './factories/pages/login/login-factory'

createRoot(document.getElementById('main')).render(
  <React.StrictMode>
    <Router
      makeLogin={MakeLogin}
    />
  </React.StrictMode>
)
