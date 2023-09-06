import { faker } from '@faker-js/faker'

import * as FormHelper from '../utils/form-helpers'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /login/

export const mockUnauthorizedError = (): void => { Http.mockUnauthorizedError(path) }
export const mockServerError = (): void => { Http.mockServerError(path, 'POST') }
export const mockSuccess = (): void => { Http.mockOk(path, 'POST', 'account') }

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').focus()
  cy.getByTestId('email').type(faker.internet.email())

  cy.getByTestId('password').focus()
  cy.getByTestId('password').type(faker.string.alphanumeric({ length: 5 }))

  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readonly')
    FormHelper.testInputStatus('email', 'Campo obrigatório')

    cy.getByTestId('password').should('have.attr', 'readonly')
    FormHelper.testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.word.words())
    FormHelper.testInputStatus('email', 'Valor inválido')

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.string.alphanumeric({ length: 3 }))
    FormHelper.testInputStatus('password', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.string.alphanumeric({ length: 5 }))
    FormHelper.testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    mockUnauthorizedError()

    simulateValidSubmit()

    FormHelper.testMainError('Credenciais inválidas')
    Helper.testUrl('/login')
  })

  it('Should present UnexpectedError on default error cases', () => {
    mockServerError()

    simulateValidSubmit()

    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve.')
    Helper.testUrl('/login')
  })

  it('Should store account on localStorage if valid credentials are provided', () => {
    mockSuccess()

    simulateValidSubmit()

    cy.getByTestId('error-wrap').should('not.have.descendants')
    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('Should not call submit if form is invalid', () => {
    mockSuccess()

    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email').type('{enter}')

    Helper.testHttpCallsCount(0)
  })
})
