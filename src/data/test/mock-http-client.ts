import { type HttpPostParams, type HttpPostClient } from '@/data/protocols/http/http-post-client'
import { httpStatusCode, type HttpResponse } from '@/data/protocols/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: httpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body

    return Promise.resolve(this.response)
  }
}
