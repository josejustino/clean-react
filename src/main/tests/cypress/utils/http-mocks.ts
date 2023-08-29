import { faker } from '@faker-js/faker'
import { type Method } from 'cypress/types/net-stubbing'

export const mockUnauthorizedError = (url: string): void => {
  cy.intercept('POST', url, {
    body: { error: faker.word.words() },
    statusCode: 401
  }).as('request')
}

export const mockForbiddenError = (url: string, method: Method): void => {
  cy.intercept(method, url, {
    body: { error: faker.word.words() },
    statusCode: 403
  }).as('request')
}

export const mockServerError = (url: string, method: Method): void => {
  cy.intercept(method, url, {
    body: { error: faker.word.words() },
    statusCode: faker.helpers.arrayElement([400, 404, 500])
  }).as('request')
}

export const mockOk = (url: string, method: Method, response: any): void => {
  cy.intercept(method, url, {
    fixture: response,
    statusCode: 200
  }).as('request')
}
