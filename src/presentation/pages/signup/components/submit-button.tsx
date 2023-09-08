import React from 'react'
import { useRecoilValue } from 'recoil'

import { SubmitButtonBase } from '@/presentation/components'

import { signupState } from './atoms'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  const state = useRecoilValue(signupState)

  return (
    <SubmitButtonBase text={text} state={state} />
  )
}

export default SubmitButton
