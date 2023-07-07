import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { type FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLenght: number) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
