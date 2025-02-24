describe('Localizadores', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    });

    it('GET', () => {
        cy.get("#user-name").type("standard_user");
        cy.get ("input#password").type("secret_sauce");
        cy.get('[data-test="login-button"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })

    it('INPUT', () => {
        cy.get('input').first().type("standard_user");
        cy.get('input').eq(1).type("secret_sauce");
        cy.get('input').last().click();
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })

    it('TYPE', () => {
        cy.get('input').filter('[type="text"]').type("standard_user");
        cy.get('input').filter('[type="password"]').type("secret_sauce");
        cy.get('input').filter('[type="submit"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })

    it('FIND', () => {
        cy.get('form').find('input').eq(0).type("standard_user");
        cy.get('form').find('input').eq(1).type("secret_sauce");
        cy.get('form').find('input').last().click();
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })

    it('PARENT', () => {
        cy.get('form').parent().should('have.class', 'login-box')
    })
})