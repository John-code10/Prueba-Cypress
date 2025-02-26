describe('Prueba de intercepción', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/network-requests');
    });

    it('Interceptar solicitud GET', () => {
        // Asegúrate de que la URL sea la correcta
        cy.intercept('GET', 'https://jsonplaceholder.cypress.io/comments/1').as('getTodo');

        // Aquí aseguramos que la acción de clic dispara la solicitud
        cy.get('.network-btn.btn.btn-primary').click();  // Asegúrate de que esto esté correctamente disparando la solicitud

        // Esperamos la solicitud y validamos la respuesta
        cy.wait('@getTodo').then((interception) => {
            // Validamos que la respuesta tenga el código 200
            expect(interception.response.statusCode).to.eq(200);

            // Cargar el archivo JSON desde fixtures
            cy.fixture('intercept.json').then((data) => {
                // Accedemos a los datos del GET desde el JSON
                const expectedData = data.get;

                // Validamos que los datos de la respuesta coincidan con los del archivo
                const responseBody = interception.response.body;
                expect(responseBody).to.deep.equal(expectedData);
            });
        });
    });

    it('Interceptar solicitud POST', () => {
        cy.intercept('POST', 'https://jsonplaceholder.cypress.io/comments').as('postTodo');
        
        // Cambié el selector aquí
        cy.get('.network-post.btn.btn-success').click(); 

        // Esperamos la solicitud POST
        cy.wait('@postTodo').then((interception) => {
            expect(interception.response.statusCode).to.eq(201);

            // Cargar el archivo JSON desde fixtures
            cy.fixture('intercept.json').then((data) => {
                // Accedemos a los datos del POST desde el JSON
                const expectedData = data.post;

                // Validamos que los datos de la respuesta coincidan con los del archivo
                const responseBody = interception.response.body;
                expect(responseBody).to.deep.equal(expectedData);
            });
        });
    });

    it('Interceptar solicitud PUT', () => {
        cy.intercept('PUT', 'https://jsonplaceholder.cypress.io/comments/1').as('putTodo');
        
        // Cambié el selector aquí
        cy.get('.network-put.btn.btn-warning').click();

        // Esperamos la solicitud POST
        cy.wait('@putTodo').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);

            // Cargar el archivo JSON desde fixtures
            cy.fixture('intercept.json').then((data) => {
                // Accedemos a los datos del POST desde el JSON
                const expectedData = data.put;

                // Validamos que los datos de la respuesta coincidan con los del archivo
                const responseBody = interception.response.body;
                expect(responseBody).to.deep.equal(expectedData);
            });
        });
    });
});
