import { faker } from '@faker-js/faker'
import { RemoveLoadSurveyResult } from '@/data/usecases'
import { HttpGetClientSpy } from '@/data/test'

type SutTypes = {
  sut: RemoveLoadSurveyResult
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoveLoadSurveyResult(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoveLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)

    await sut.load()

    expect(httpGetClientSpy.url).toBe(url)
  })
})
