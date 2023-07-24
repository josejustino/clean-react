import axios from 'axios'
import { faker } from '@faker-js/faker'

export const mockHttpResponse = (): any => ({
  data: {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName()
  },
  status: faker.internet.httpStatusCode()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse())
  mockedAxios.get.mockClear().mockResolvedValue(mockHttpResponse())

  return mockedAxios
}
