import axios, { type AxiosResponse } from 'axios'

import { type HttpResponse, type HttpPostParams, type HttpPostClient } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<any> {
  async post (params: HttpPostParams): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse

    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        httpResponse = error
      } else {
        httpResponse = error.response
      }
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
