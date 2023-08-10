import { faker } from '@faker-js/faker'
import * as Helper from '../support/http-mocks'

export const mockInvalidCredentialsError = (): void => { Helper.mockInvalidCredentialsError('login') }
export const mockUnexpectedError = (): void => { Helper.mockUnexpectedError('login', 'POST') }
export const mockOk = (): void => { Helper.mockOk('login', 'POST', { accessToken: faker.string.uuid(), name: faker.person.fullName() }) }
export const mockInvalidData = (): void => { Helper.mockOk('login', 'POST', { invalidProperty: faker.string.uuid() }) }
