import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen } from '@testing-library/react'

import { ApiContext } from '@/presentation/contexts'
import { SurveyResult } from '@/presentation/pages'

import { mockAccountModel } from '@/domain/test'

const makeSut = (): void => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
      <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel()
      }}>
        <Router location={history.location} navigator={history}>
        <SurveyResult />
        </Router>
    </ApiContext.Provider>
  )
}

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    makeSut()

    const surveyResult = screen.getByTestId('survey-result')

    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
