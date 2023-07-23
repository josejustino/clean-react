import { faker } from '@faker-js/faker'
import { type Method } from 'cypress/types/net-stubbing'

export const mockInvalidCredentialsError = (url: string): void => {
  cy.intercept('POST', url, {
    body: { error: faker.word.words() },
    statusCode: 401
  }).as('request')
}

export const mockUnexpectedError = (url: string, method: Method): void => {
  cy.intercept(method, url, {
    body: { error: faker.word.words() },
    statusCode: 400
  }).as('request')
}

export const mockOk = (url: string, method: Method, response: any): void => {
  cy.intercept(method, url, {
    body: response,
    statusCode: 200
  }).as('request')
}
