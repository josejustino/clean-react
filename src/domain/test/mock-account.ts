import { faker } from '@faker-js/faker'

import { type AccountModel } from '@/domain/models'

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid(),
  name: faker.person.fullName()
})
