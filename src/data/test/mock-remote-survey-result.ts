import { faker } from '@faker-js/faker'
import { type RemoteLoadSurveyResult } from '@/data/usecases'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.word.words(),
  date: faker.date.recent().toISOString(),
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
})
