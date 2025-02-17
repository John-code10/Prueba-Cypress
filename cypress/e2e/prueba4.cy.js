beforeEach(() => {
  cy.visit('https://example.cypress.io')
})

describe('Pagina de Type', () => {
  it('Prueba que el botón de tipo se cliquea correctamente', () => {
    cy.contains('type').click()
    cy.url().should('include', '/commands/actions')

    cy.get('#email1')
      .should('have.attr', 'placeholder', 'Email')
      .type('john@gmail.com')
      .should('have.value', 'john@gmail.com')
      .clear()
  })
})