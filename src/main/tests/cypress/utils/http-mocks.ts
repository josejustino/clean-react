import { faker } from '@faker-js/faker'
import { type Method } from 'cypress/types/net-stubbing'

export const mockUnauthorizedError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    body: { error: faker.word.words() },
    statusCode: 401
  }).as('request')
}

export const mockForbiddenError = (url: RegExp, method: Method): void => {
  cy.intercept(method, url, {
    body: { error: faker.word.words() },
    statusCode: 403
  }).as('request')
}

export const mockServerError = (url: RegExp | string, method: Method): void => {
  console.log(url)
  cy.intercept(method, url, {
    body: { error: faker.word.words() },
    statusCode: faker.helpers.arrayElement([400, 404, 500])
  }).as('request')
}

export const mockOk = (url: RegExp, method: Method, response: any): void => {
  cy.intercept(method, url, {
    fixture: response,
    statusCode: 200
  }).as('request')
}
