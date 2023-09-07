import { type GetStorage } from '@/data/protocols/cache'
import { type HttpClient, type HttpRequest, type HttpResponse } from '@/data/protocols/http'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpClient
  ) {}

  async request (data: HttpRequest): Promise<HttpResponse> {
    const account = this.getStorage.get('account')

    if (account?.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          'x-access-token': account.accessToken
        })
      })
    }

    const httpResponse = await this.httpGetClient.request(data)

    return httpResponse
  }
}
