import React from 'react'
import { useRecoilState } from 'recoil'

import { FormStatusBase } from '@/presentation/components'

import { signupState } from './atoms'

const FormStatus: React.FC = () => {
  const [state] = useRecoilState(signupState)

  return (
    <FormStatusBase state={state} />
  )
}

export default FormStatus
