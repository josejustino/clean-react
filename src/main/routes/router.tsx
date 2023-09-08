import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'

import { MakeLogin, MakeSignUp, MakeSurveyList, MakeSurveyResult } from '@/main/factories/pages'
import { PrivateRoute, currentAccountState } from '@/presentation/components'

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }

  return (
    <RecoilRoot initializeState={({ set }) => { set(currentAccountState, state) }}>
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
    </RecoilRoot>
  )
}

export default Router
