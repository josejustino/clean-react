import React from 'react'
import { screen, render } from '@testing-library/react'

import { Login } from '@/presentation/pages'

describe('Login Component', () => {
  test('Should not render spinner and error on start', () => {
    render(<Login />)

    const errorWrap = screen.getByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(0)
  })
})
