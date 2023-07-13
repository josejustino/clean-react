import React from 'react'

import { makeSignUpValidation } from './signup-validation-factory'
import { makeLocalSaveAccessToken } from '@/main/factories/useCases/save-access-token/local-save-access-token-factory'
import { makeRemoteAddAccount } from '@/main/factories/useCases/add-account/remote-add-account-factory'

import { SignUp } from '@/presentation/pages'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}