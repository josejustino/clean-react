import React, { useMemo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'

import { MakeLogin } from '@/main/factories/pages/login/login-factory'
import { MakeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { SurveyList } from '@/presentation/pages'

const Router: React.FC = () => {
  const context = useMemo(() => ({
    setCurrentAccount: setCurrentAccountAdapter
  }), [])

  return (
    <ApiContext.Provider
      value={context}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<MakeLogin />} />
          <Route path='/signup' element={<MakeSignUp />} />
          <Route path='/' element={<SurveyList />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
