import React from 'react'
import { Router } from 'react-router-dom'
import { type MemoryHistory, createMemoryHistory } from 'history'
import { fireEvent, render, screen } from '@testing-library/react'
import { SurveyItem } from '@/presentation//pages/survey-list/components'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <Router location={history.location} navigator={history}>
      <SurveyItem survey={survey} />
    </Router>
  )

  return {
    history
  }
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2023-07-30T00:00:00')
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('30')
    expect(screen.getByTestId('month')).toHaveTextContent(/^jul$/)
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2023-06-03T00:00:00')
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent(/^jun$/)
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })

  test('Should go to SurveyResult', () => {
    const survey = mockSurveyModel()
    const { history } = makeSut(survey)

    fireEvent.click(screen.getByTestId('link'))

    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
