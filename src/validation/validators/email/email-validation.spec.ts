import { EmailValidation } from '@/validation/validators/email/email-validation'
import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { faker } from '@faker-js/faker'

describe('EmailValidation', () => {
  test('Should return error if e-mail is invalid', () => {
    const sut = new EmailValidation(faker.word.words())
    const error = sut.validate(faker.word.words())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if e-mail is valid', () => {
    const sut = new EmailValidation(faker.word.words())
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
