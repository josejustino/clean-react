import { type HttpPostClient, httpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'
import { type AccountModel } from '@/domain/models'
import { type Authentication, type AuthenticationParams } from '@/domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel | undefined> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })

    switch (httpResponse.statusCode) {
      case httpStatusCode.ok: return httpResponse.body
      case httpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
