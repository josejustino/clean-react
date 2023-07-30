import { faker } from '@faker-js/faker'

import { type SurveyModel } from '@/domain/models'

export const mockSurveyModel = (): SurveyModel => (
  {
    id: faker.string.uuid(),
    question: faker.word.words(),
    answers: [
      {
        answer: faker.word.words(),
        image: faker.internet.url()
      },
      {
        answer: faker.word.words(),
        image: faker.internet.url()
      }
    ],
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent()
  }
)

export const mockSurveyListModel = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])
