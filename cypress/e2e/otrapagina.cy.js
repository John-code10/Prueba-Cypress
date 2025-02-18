/// <reference types="cypress" />

describe('Pruebas de inicio de sesión en SauceDemo', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  it('Verificar que todos los usuarios puedan iniciar sesión', () => {
    cy.fixture('users.json').then((data) => {
      data.users.forEach((user) => {
        cy.log(`Probando login con: ${user.username}`);

        cy.get('[data-test="username"]').clear().type(user.username);
        cy.get('[data-test="password"]').clear().type(user.password);
        cy.get('[data-test="login-button"]').click();

        cy.get('body').then(($body) => {
          if ($body.find('[data-test="error"]').length > 0) {
            cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.');
          } else {
            cy.get('.inventory_list', { timeout: 5000 }).should('exist'); // Espera a que cargue la lista de productos
            cy.url().should('include', '/inventory.html');
            cy.get('.app_logo').should('be.visible');

            // Cerrar sesión para probar con el siguiente usuario
            cy.get('#react-burger-menu-btn').click();
            cy.get('#logout_sidebar_link').click();
            cy.url().should('eq', 'https://www.saucedemo.com/');
          }
        });
      });
    });
  });
});



