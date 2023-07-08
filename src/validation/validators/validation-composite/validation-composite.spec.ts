import { faker } from '@faker-js/faker'

import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation.composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]

  const sut = new ValidationComposite(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error ir any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const errorMessage = faker.word.words()

    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.word.words())

    const error = sut.validate(fieldName, faker.word.words())

    expect(error).toBe(errorMessage)
  })

  test('Should return falsy if validation not fails', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)

    const error = sut.validate(fieldName, faker.word.words())

    expect(error).toBeFalsy()
  })
})
