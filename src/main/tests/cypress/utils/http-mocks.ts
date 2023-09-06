import { faker } from '@faker-js/faker'
import { type RouteMatcher, type Method } from 'cypress/types/net-stubbing'

export const mockUnauthorizedError = (url: RouteMatcher): void => {
  cy.intercept('POST', url, {
    body: { error: faker.word.words() },
    statusCode: 401
  }).as('request')
}

export const mockForbiddenError = (url: RouteMatcher, method: Method): void => {
  cy.intercept(method, url, {
    body: { error: faker.word.words() },
    statusCode: 403
  }).as('request')
}

export const mockServerError = (url: RouteMatcher, method: Method): void => {
  cy.intercept(method, url, {
    body: { error: faker.word.words() },
    statusCode: faker.helpers.arrayElement([400, 404, 500])
  }).as('request')
}

export const mockOk = (url: RouteMatcher, method: Method, response: any): void => {
  cy.intercept(method, url, {
    fixture: response,
    statusCode: 200
  }).as('request')
}
