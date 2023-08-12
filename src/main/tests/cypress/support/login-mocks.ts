import { faker } from '@faker-js/faker'
import * as Http from './http-mocks'

export const mockUnauthorizedError = (): void => { Http.mockUnauthorizedError('login') }
export const mockServerError = (): void => { Http.mockServerError('login', 'POST') }
export const mockOk = (): void => { Http.mockOk('login', 'POST', { accessToken: faker.string.uuid(), name: faker.person.fullName() }) }
