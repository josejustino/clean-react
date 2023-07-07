import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'

describe('MinLenghtValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('123')

    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('12345')

    expect(error).toBeFalsy()
  })
})
