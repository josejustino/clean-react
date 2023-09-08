import React from 'react'
import { useRecoilValue } from 'recoil'

import { FormStatusBase } from '@/presentation/components'

import { signupState } from './atoms'

const FormStatus: React.FC = () => {
  const state = useRecoilValue(signupState)

  return (
    <FormStatusBase state={state} />
  )
}

export default FormStatus
