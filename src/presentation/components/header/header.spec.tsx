import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { ApiContext } from '@/presentation/contexts'

import { Header } from '@/presentation/components'

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()

    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </ApiContext.Provider>
    )

    fireEvent.click(screen.getByTestId('logout'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
