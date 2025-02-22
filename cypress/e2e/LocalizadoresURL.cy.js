//https://docs.cypress.io/api/commands/location

beforeEach(() => {
    cy.visit('https://example.cypress.io')
})
describe('Verificación de la URL en la página de ejemplo de Cypress', () => {
    it('Debería cargar la página correctamente y validar la URL', () => {
        //cy.title().should('eq', 'Welcome to Cypress')
        cy.location('pathname').should('eq', '/')
        cy.location('hostname').should('eq', 'example.cypress.io') 
        cy.location('protocol').should('eq', 'https:')
        cy.location('href').should('eq', 'https://example.cypress.io/')
        cy.location('host').should('eq', 'example.cypress.io')
        cy.url().should('eq', 'https://example.cypress.io/')
    })
})
