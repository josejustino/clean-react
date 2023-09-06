import { faker } from '@faker-js/faker'

import { type LoadSurveyResult } from '@/domain/usecases'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => (
  {
    question: faker.word.words(),
    date: faker.date.recent(),
    answers: [{
      image: faker.internet.url(),
      answer: faker.word.words(),
      count: faker.number.int(),
      percent: faker.number.int(100),
      isCurrentAccountAnswer: faker.datatype.boolean()
    }, {
      answer: faker.word.words(),
      count: faker.number.int(),
      percent: faker.number.int(100),
      isCurrentAccountAnswer: faker.datatype.boolean()
    }]
  }
)

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  surveyResult = mockSurveyResultModel()

  async load (): Promise<LoadSurveyResult.Model> {
    this.callsCount++

    return this.surveyResult
  }
}
