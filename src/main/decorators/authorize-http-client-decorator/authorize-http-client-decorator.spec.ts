import { faker } from '@faker-js/faker'

import { mockAccountModel } from '@/domain/test'
import { GetStorageSpy, HttpClientSpy, mockHttpRequest } from '@/data/test'
import { type HttpRequest } from '@/data/protocols/http'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  getStorageSpy: GetStorageSpy
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpClientSpy = new HttpClientSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy)

  return {
    sut, getStorageSpy, httpClientSpy
  }
}

describe('AuthorizeHttpClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { getStorageSpy, sut } = makeSut()

    await sut.request(mockHttpRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut()

    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.internet.httpMethod(),
      headers: {
        field: faker.word.words()
      }
    }

    await sut.request(httpRequest)

    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual(httpRequest.headers)
  })

  test('Should add headers to HttpClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()

    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.internet.httpMethod()
    }

    await sut.request(httpRequest)

    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should merge headers to HttpClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()

    const field = faker.word.words()

    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.internet.httpMethod(),
      headers: { field }
    }

    await sut.request(httpRequest)

    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should return the same result as HttpClient', async () => {
    const { sut, httpClientSpy } = makeSut()

    const httpResponse = await sut.request(mockHttpRequest())

    expect(httpResponse).toEqual(httpClientSpy.response)
  })
})
