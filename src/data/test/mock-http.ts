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

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${faker.string.uuid()}`
  }
})

export class HttpPostClientSpy<R = any> implements HttpPostClient<R> {
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

export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  url: string
  headers?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.headers = params.headers
    return this.response
  }
}
