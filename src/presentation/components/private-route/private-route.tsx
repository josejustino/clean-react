import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'

const PrivateRoute: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)

  return (
    getCurrentAccount()?.accessToken ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoute
