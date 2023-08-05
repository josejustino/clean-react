import React from 'react'
import { cleanup, render, screen, waitFor } from '@testing-library/react'

import { SurveyList } from '@/presentation/pages'
import { type LoadSurveyList } from '@/domain/usecases'
import { type SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++

    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return {
    loadSurveyListSpy
  }
}

describe('SurveyList Component', () => {
  beforeEach(() => {
    cleanup()
  })

  test('Should present 4 empty items on start', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()

    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should render SurveyItems on success', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')

    await waitFor(() => surveyList)

    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  // TO DO - Verificar porque o método spy não injeta o erro
  // test('Should render error on failure', async () => {
  //   const loadSurveyListSpy = new LoadSurveyListSpy()
  //   const error = new UnexpectedError()

  //   jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
  //   makeSut(loadSurveyListSpy)

  //   await waitFor(() => screen.getByRole('heading'))

  //   expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
  //   expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  // })
})
