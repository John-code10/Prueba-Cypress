export default class SwagLabsLoginPage { // 🚨 ¡Nombre de clase cambiado!
    visit() {
      cy.visit("https://www.saucedemo.com/");
    }
  
    get usernameInput() {
      return cy.get("#user-name").should("be.visible");
    }
  
    get passwordInput() {
      return cy.get("#password").should("be.visible");
    }
  
    get loginButton() {
      return cy.get("#login-button").should("be.visible");
    }
  
    login(username, password) {
      this.usernameInput.type(username);
      this.passwordInput.type(password);
      this.loginButton.click();
    }
}