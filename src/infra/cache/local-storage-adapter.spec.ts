import { faker } from '@faker-js/faker'
import { cleanup } from '@testing-library/react'
import 'jest-localstorage-mock'

import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { type AccountModel } from '@/domain/models'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage.setItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value: AccountModel = {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName()
    }

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('Should call localStorage.getItem with correct value', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value: AccountModel = {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName()
    }

    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)

    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
