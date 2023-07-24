import { faker } from '@faker-js/faker'

import {
  type HttpPostParams,
  type HttpPostClient,
  type HttpResponse,
  type HttpGetClient,
  type HttpGetParams,
  HttpStatusCode
} from '@/data/protocols/http'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    gender: faker.person.sex(),
    jobArea: faker.person.jobArea()
  }
})

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body

    return this.response
  }
}

export class HttpGetClientSpy implements HttpGetClient {
  url: string
  async get (params: HttpGetParams): Promise<void> {
    this.url = params.url
  }
}
