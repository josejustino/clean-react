import { faker } from '@faker-js/faker'
import { cleanup } from '@testing-library/react'
import 'jest-localstorage-mock'

import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

describe('LocalStorageAdapter', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with correct values', async () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.word.words()

    await sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
