import { faker } from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readonly')
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')

    cy.getByTestId('password').should('have.attr', 'readonly')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.word.words())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.string.alphanumeric({ length: 3 }))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.string.alphanumeric({ length: 5 }))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    cy.intercept('POST', '/login', {
      body: { error: faker.word.words() },
      statusCode: 401
    })

    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.string.alphanumeric({ length: 5 }))

    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError on 400', () => {
    cy.intercept('POST', '/login', {
      body: { error: faker.word.words() },
      statusCode: 400
    })

    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.string.alphanumeric({ length: 5 }))

    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', '/login', {
      statusCode: 200,
      body: { accessToken: faker.string.uuid() }
    })

    cy.getByTestId('email').focus()
    cy.getByTestId('email').type('johndoe@gmail.com')

    cy.getByTestId('password').focus()
    cy.getByTestId('password').type('12345')

    cy.getByTestId('submit').click()
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })
})