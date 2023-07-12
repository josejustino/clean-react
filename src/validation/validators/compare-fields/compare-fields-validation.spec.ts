import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fields-validation'

const makeSut = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.word.words())
    const error = sut.validate(faker.word.words())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if compare is valid', () => {
    const valueToCompare = faker.word.words()
    const sut = makeSut(valueToCompare)
    const error = sut.validate(valueToCompare)
    expect(error).toBeFalsy()
  })
})
