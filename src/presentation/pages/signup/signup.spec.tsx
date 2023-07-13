import React from 'react'
import { type RenderResult, render } from '@testing-library/react'

import SignUp from './signup'

import { Helper } from '@/presentation/test'

type StuTypes = {
  sut: RenderResult
}

const makeSut = (): StuTypes => {
  const sut = render(<SignUp />)

  return {
    sut
  }
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const validationError = 'Campo obrigatório'

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
