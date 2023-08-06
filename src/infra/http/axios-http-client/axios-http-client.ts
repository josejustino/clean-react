import axios, { type AxiosResponse } from 'axios'

import {
  type HttpResponse,
  type HttpPostParams,
  type HttpPostClient,
  type HttpGetParams,
  type HttpGetClient
} from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
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

    return this.adapt(axiosResponse)
  }

  async get (params: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.get(params.url, { headers: params.headers })
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        axiosResponse = error
      } else {
        axiosResponse = error.response
      }
    }

    return this.adapt(axiosResponse)
  }

  private adapt (axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
