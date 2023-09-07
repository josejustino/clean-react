import { faker } from '@faker-js/faker'

import {
  type HttpRequest,
  type HttpResponse,
  type HttpClient,
  HttpStatusCode
} from '@/data/protocols/http'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.internet.httpMethod(),
  body: {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: faker.person.sex(),
    jobArea: faker.person.jobArea()
  },
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${faker.string.uuid()}`
  }
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string
  method?: string
  body?: any
  headers?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers

    return this.response
  }
}
