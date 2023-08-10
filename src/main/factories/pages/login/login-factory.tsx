import React from 'react'

import { makeRemoveAuthentication } from '@/main/factories/useCases/authentication/remote-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'

import { Login } from '@/presentation/pages'

export const MakeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoveAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
