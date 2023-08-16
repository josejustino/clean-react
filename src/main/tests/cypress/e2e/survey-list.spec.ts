import { faker } from '@faker-js/faker'

import * as Helper from '../support/helpers'
import * as Http from '../support/survey-list-mocks'

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', { accessToken: faker.string.uuid(), name: faker.person.fullName() })
    cy.visit('')
  })

  it('Should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()

    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })
})
