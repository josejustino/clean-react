import axios, { type AxiosResponse } from 'axios'

import { type HttpResponse, type HttpPostParams, type HttpPostClient } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<any> {
  async post (params: HttpPostParams): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        axiosResponse = error
      } else {
        axiosResponse = error.response
      }
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
