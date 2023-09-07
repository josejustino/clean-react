import type axios from 'axios'

import { mockAxios, mockHttpResponse } from '@/infra/test'
import { AxiosHttpClient } from './axios-http-client'
import { mockHttpRequest } from '@/data/test'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}
const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  describe('post', () => {
    test('Should call axios with correct values', async () => {
      const request = mockHttpRequest()
      const { sut, mockedAxios } = makeSut()

      await sut.request(request)
      expect(mockedAxios.request).toHaveBeenCalledWith({
        url: request.url,
        method: request.method,
        data: request.body,
        headers: request.headers
      })
    })

    test('Should return correct response on axios', async () => {
      const { sut, mockedAxios } = makeSut()
      const httpResponse = await sut.request(mockHttpRequest())
      const axiosResponse = await mockedAxios.request.mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    test('Should return the correct error on axios', async () => {
      const { sut, mockedAxios } = makeSut()

      mockedAxios.request.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const promise = sut.request(mockHttpRequest())
      expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
    })
  })
})
