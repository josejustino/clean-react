import { faker } from '@faker-js/faker'
import * as Http from './http-mocks'

export const mockForbiddenError = (): void => { Http.mockForbiddenError('signup', 'POST') }
export const mockServerError = (): void => { Http.mockServerError('signup', 'POST') }
export const mockOk = (): void => { Http.mockOk('signup', 'POST', { accessToken: faker.string.uuid(), name: faker.person.fullName() }) }
