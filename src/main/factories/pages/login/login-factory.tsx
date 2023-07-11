import React from 'react'

import { makeRemoveAuthentication } from '@/main/factories/useCases/authentication/remote-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'
import { makeLocalSaveAccessToken } from '@/main/factories/useCases/save-access-token/local-save-access-token-factory'

import { Login } from '@/presentation/pages'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoveAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
