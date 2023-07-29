import React from 'react'

import { makeRemoveAuthentication } from '@/main/factories/useCases/authentication/remote-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/useCases/update-current-account/local-update-current-account-factory'

import { Login } from '@/presentation/pages'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoveAuthentication()}
      validation={makeLoginValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
