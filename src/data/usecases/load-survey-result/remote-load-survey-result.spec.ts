import { faker } from '@faker-js/faker'
import { RemoveLoadSurveyResult } from '@/data/usecases'
import { HttpGetClientSpy } from '@/data/test'

describe('RemoveLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoveLoadSurveyResult(url, httpGetClientSpy)

    await sut.load()

    expect(httpGetClientSpy.url).toBe(url)
  })
})
