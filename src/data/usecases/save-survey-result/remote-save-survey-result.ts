import { type RemoteSurveyResultModel } from '@/data/models'
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { type SaveSurveyResult } from '@/domain/usecases'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.request({
      url: this.url,
      method: 'PUT',
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return null
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}
