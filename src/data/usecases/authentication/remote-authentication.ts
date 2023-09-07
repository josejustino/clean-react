import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'

import { type HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { type Authentication } from '@/domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpClient<RemoteAuthentication.Model>
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Model | undefined> {
    const httpResponse = await this.httpPostClient.request({
      url: this.url, method: 'POST', body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model
}
