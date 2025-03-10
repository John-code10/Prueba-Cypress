import SwagLabsLoginPage from '../../pages/SwagLabsLoginPage'; 

describe("Login Test", () => {
  const loginPage = new SwagLabsLoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it("should login successfully", () => {
    loginPage.login("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory");
  });

  it("should login unsuccessfully", () => {
    loginPage.login("locked_out_user", "secret_sauce");
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.');
  });

});

/*
En una entrevista de trabajo, puedes explicar POM (Page Object Model) de manera simple así:

"POM es un patrón de diseño en automatización de pruebas que ayuda a organizar y mantener el código. Básicamente, separa la lógica de prueba de la estructura de la página. Cada página de la aplicación se representa como una clase en el código, con métodos que interactúan con los elementos de la página. Esto hace que las pruebas sean más reutilizables, fáciles de leer y mantener."

Si quieres dar un ejemplo, puedes agregar:
"Por ejemplo, si tengo una página de inicio de sesión, en lugar de escribir el código para ingresar usuario y contraseña en cada prueba, creo una clase 'LoginPage' con métodos como 'ingresarUsuario' y 'ingresarContraseña'. Así, mis pruebas solo llaman a esos métodos sin repetir código."

Esto demuestra que entiendes la teoría y cómo aplicarla en la práctica.
*/