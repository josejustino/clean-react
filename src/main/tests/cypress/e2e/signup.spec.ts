import { faker } from '@faker-js/faker'
import * as FormHelper from '../support/form-helper'

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
})
