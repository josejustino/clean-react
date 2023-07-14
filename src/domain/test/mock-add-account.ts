import { faker } from '@faker-js/faker'

import { type AddAccountParams } from '@/domain/usecases'

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password()

  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
