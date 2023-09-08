import React, { useMemo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { ApiContext } from '@/presentation/contexts'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'

import { MakeLogin, MakeSignUp, MakeSurveyList, MakeSurveyResult } from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components'

const Router: React.FC = () => {
  const context = useMemo(() => ({
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }), [])

  return (
    <RecoilRoot>
      <ApiContext.Provider
        value={context}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<MakeLogin />} />
            <Route path='/signup' element={<MakeSignUp />} />

            <Route
              element={<PrivateRoute />}
            >
              <Route path='/' element={<MakeSurveyList />} />
              <Route path='/surveys/:id' element={<MakeSurveyResult />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApiContext.Provider>
    </RecoilRoot>
  )
}

export default Router
