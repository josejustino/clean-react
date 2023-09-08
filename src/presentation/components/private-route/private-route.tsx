import React from 'react'
import { useRecoilValue } from 'recoil'
import { Outlet, Navigate } from 'react-router-dom'

import { currentAccountState } from '@/presentation/components'

const PrivateRoute: React.FC = () => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)

  return (
    getCurrentAccount()?.accessToken ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoute
