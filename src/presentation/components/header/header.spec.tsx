import React from 'react'
import { RecoilRoot } from 'recoil'
import { fireEvent, render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { type MemoryHistory, createMemoryHistory } from 'history'

import { type AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

import { Header, currentAccountState } from '@/presentation/components'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }

  render(
    <RecoilRoot initializeState={({ set }) => { set(currentAccountState, mockedState) }}>
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    </RecoilRoot>
  )

  return {
    history,
    setCurrentAccountMock
  }
}

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut()

    fireEvent.click(screen.getByTestId('logout'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should render username correctly', () => {
    const account = mockAccountModel()

    makeSut(account)

    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
