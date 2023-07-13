import React from 'react'
import { createRoot } from 'react-dom/client'

import { Router } from '@/presentation/components'

import '@/presentation/styles/global.scss'
import { makeLogin as MakeLogin } from './factories/pages/login/login-factory'
import { makeSignUp } from './factories/pages/signup/signup-factory'

createRoot(document.getElementById('main')).render(
  <React.StrictMode>
    <Router
      makeLogin={MakeLogin}
      makeSignUp={makeSignUp}
    />
  </React.StrictMode>
)
