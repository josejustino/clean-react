import axios from 'axios'
import { faker } from '@faker-js/faker'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const mockedAxiosResult = {
    data: {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      gender: faker.person.sex(),
      jobArea: faker.person.jobArea()
    },
    status: faker.number.int()
  }
  mockedAxios.post.mockResolvedValue(mockedAxiosResult)

  return mockedAxios
}
