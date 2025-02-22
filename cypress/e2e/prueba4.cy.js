/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('https://example.cypress.io')
})

describe('Pagina de Type', () => {
  it('Prueba que el botón de tipo se cliquea correctamente', () => {
    cy.contains('type').click()
    cy.url().should('include', 'commands/actions')

    cy.get('#email1')
      .should('be.visible')
      .and('have.attr', 'type', 'email')
      .and('have.attr', 'placeholder', 'Email')
      .type('b2b0M@example.com')
      cy.get('#email1').should('have.value', 'b2b0M@example.com')
      cy.get('#email1').clear()
  })
})

