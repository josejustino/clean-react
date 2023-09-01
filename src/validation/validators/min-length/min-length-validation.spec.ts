import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, 5)
describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.string.alphanumeric({ length: 4 }) })

    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.string.alphanumeric({ length: 5 }) })

    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists on schema', () => {
    const sut = makeSut('any_field')
    const error = sut.validate({ invalidField: faker.string.alphanumeric({ length: 5 }) })

    expect(error).toBeFalsy()
  })
})
