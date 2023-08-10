import { faker } from '@faker-js/faker'
import { type LoadSurveyList } from '@/domain/usecases'

export const mockSurveyModel = (): LoadSurveyList.Model => (
  {
    id: faker.string.uuid(),
    question: faker.word.words(),
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent()
  }
)

export const mockSurveyListModel = (): LoadSurveyList.Model[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    this.callsCount++

    return this.surveys
  }
}
