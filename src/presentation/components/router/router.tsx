import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { SurveyList } from '@/presentation/pages'

type Factory = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router: React.FC<Factory> = (factory) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<factory.makeLogin />} />
        <Route path='/signup' element={<factory.makeSignUp />} />
        <Route path='/' element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
