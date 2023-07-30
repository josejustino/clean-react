import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyItem } from '@/presentation//pages/survey-list/components'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem Component', () => {
  const survey = Object.assign(mockSurveyModel(), {
    didAnswer: true,
    date: new Date('2023-07-30T00:00:00')
  })

  makeSut(survey)

  test('Should render with correct values', () => {
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('30')
    expect(screen.getByTestId('month')).toHaveTextContent(/^jul$/)
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })
})
