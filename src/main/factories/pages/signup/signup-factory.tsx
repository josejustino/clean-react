import React from 'react'

import { makeSignUpValidation } from './signup-validation-factory'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/useCases/update-current-account/local-update-current-account-factory'
import { makeRemoteAddAccount } from '@/main/factories/useCases/add-account/remote-add-account-factory'

import { SignUp } from '@/presentation/pages'

export const MakeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
