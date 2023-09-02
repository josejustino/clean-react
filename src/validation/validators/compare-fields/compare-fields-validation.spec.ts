import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fields-validation'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = 'field_1'
    const fieldToCompare = 'field_2'
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.word.words(3),
      [fieldToCompare]: faker.word.words(4)
    })

    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if compare is valid', () => {
    const field = 'any_field'
    const fieldToCompare = 'other_field'
    const value = faker.word.words()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })

    expect(error).toBeFalsy()
  })
})
