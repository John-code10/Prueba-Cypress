describe('Pruebas de fixtures', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Probar inicio de sesión con cada usuario', () => {
        cy.fixture('usuarios.json').then((data) => {
            data.usernames.forEach((username) => {
                cy.get('[data-test="username"]').clear().type(username)
                cy.get('[data-test="password"]').clear().type(data.password)
                cy.get('[data-test="login-button"]').click()

                // Validar si el usuario inició sesión correctamente
                cy.url().then((url) => {
                    if (url.includes('inventory.html')) {
                        cy.log(`Inicio de sesión exitoso para ${username}`)
                        cy.get('#react-burger-menu-btn').click()
                        cy.get('#logout_sidebar_link').click()
                    } else {
                        cy.log(`Fallo el inicio de sesión para ${username}`)
                    }
                })
            })
        })
    })
})
