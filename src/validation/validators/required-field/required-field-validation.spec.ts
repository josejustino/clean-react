import { faker } from '@faker-js/faker'

import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'

const makeSut = (field: string): RequiredFieldValidation => new RequiredFieldValidation(field)

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.word.words() })
    expect(error).toBeFalsy()
  })
})
