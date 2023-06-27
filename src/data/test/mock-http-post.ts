import { faker } from '@faker-js/faker'

import { type HttpPostParams } from '../protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: faker.person.sex(),
    jobArea: faker.person.jobArea()
  }
})
