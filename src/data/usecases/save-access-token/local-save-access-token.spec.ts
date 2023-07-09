import { faker } from '@faker-js/faker'

import { SetStorageSpy } from '@/data/test/mock-storage'
import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)
    const accessToken = faker.string.uuid()

    await sut.save(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
