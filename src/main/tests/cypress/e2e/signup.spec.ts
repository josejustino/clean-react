import { faker } from '@faker-js/faker'

import * as FormHelper from '../utils/form-helpers'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /signup/
export const mockForbiddenError = (): void => { Http.mockForbiddenError(path, 'POST') }
export const mockServerError = (): void => { Http.mockServerError(path, 'POST') }
export const mockSuccess = (): void => {
  Http.mockOk(/api\/surveys/, 'GET', 'survey-list')
  Http.mockOk(path, 'POST', 'account', 'signUpRequest')
}

const populateFields = (): void => {
  cy.getByTestId('name').focus()
  cy.getByTestId('name').type(faker.person.fullName())

  cy.getByTestId('email').focus()
  cy.getByTestId('email').type(faker.internet.email())

  const password = faker.string.alphanumeric({ length: 7 })

  cy.getByTestId('password').focus()
  cy.getByTestId('password').type(password)
  FormHelper.testInputStatus('password')

  cy.getByTestId('passwordConfirmation').focus()
  cy.getByTestId('passwordConfirmation').type(password)
  FormHelper.testInputStatus('passwordConfirmation')
}

const simulateValidSubmit = (): void => {
  populateFields()

  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readonly')
    FormHelper.testInputStatus('name', 'Campo obrigatório')

    cy.getByTestId('email').should('have.attr', 'readonly')
    FormHelper.testInputStatus('email', 'Campo obrigatório')

    cy.getByTestId('password').should('have.attr', 'readonly')
    FormHelper.testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('passwordConfirmation').should('have.attr', 'readonly')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should reset state on page load', () => {
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())

    FormHelper.testInputStatus('email')

    cy.getByTestId('login-link').click()
    cy.getByTestId('signup-link').click()

    FormHelper.testInputStatus('email', 'Campo obrigatório')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus()
    cy.getByTestId('name').type(faker.string.alphanumeric({ length: 3 }))
    FormHelper.testInputStatus('name', 'Valor inválido')

    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.word.words())
    FormHelper.testInputStatus('email', 'Valor inválido')

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.string.alphanumeric({ length: 3 }))
    FormHelper.testInputStatus('password', 'Valor inválido')

    cy.getByTestId('passwordConfirmation').focus()
    cy.getByTestId('passwordConfirmation').type(faker.string.alphanumeric({ length: 4 }))
    FormHelper.testInputStatus('passwordConfirmation', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').focus()
    cy.getByTestId('name').type(faker.person.fullName())
    FormHelper.testInputStatus('name')

    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')

    const password = faker.string.alphanumeric({ length: 5 })

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(password)
    FormHelper.testInputStatus('password')

    cy.getByTestId('passwordConfirmation').focus()
    cy.getByTestId('passwordConfirmation').type(password)
    FormHelper.testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUse on 403', () => {
    mockForbiddenError()

    simulateValidSubmit()

    FormHelper.testMainError('Esse e-mail já está em uso')
    Helper.testUrl('/signup')
  })

  it('Should present UnexpectedError on default error cases', () => {
    mockServerError()

    simulateValidSubmit()

    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve.')
    Helper.testUrl('/signup')
  })

  it('Should store account on localStorage if valid credentials are provided', () => {
    mockSuccess()

    simulateValidSubmit()

    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  // it('Should prevent multiple submits', () => {
  //   mockSuccess()
  //   populateFields()

  //   cy.getByTestId('submit').dblclick()
  //   cy.wait('@signUpRequest')
  //   cy.get('@signUpRequest.all').should('have.length', 1)
  // })

  it('Should not call submit if form is invalid', () => {
    mockSuccess()

    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email').type('{enter}')

    cy.get('@signUpRequest.all').should('have.length', 0)
  })
})
