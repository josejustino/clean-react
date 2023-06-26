import { type AuthenticationParams } from 'domain/usecases/authentication'
import { faker } from '@faker-js/faker'
import { type AccountModel } from '@/domain/models/account-model'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid()
})
