describe('Pruebas API específica: /api/users?page=2', () => {
    const API_URL = 'https://reqres.in/api/users?page=2';
  
    // Realiza la petición antes de cada test y asigna la respuesta a un alias
    beforeEach(() => {
      cy.request(API_URL).as('apiResponse');
    });
  
    // Función auxiliar para validar la estructura de un usuario
    function validarEstructuraUsuario(user) {
      expect(user).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
      expect(user.id).to.be.a('number');
      expect(user.email).to.match(/^\S+@reqres\.in$/);
      expect(user.first_name).to.be.a('string').and.not.empty;
      expect(user.last_name).to.be.a('string').and.not.empty;
      expect(user.avatar).to.match(/^https:\/\/reqres\.in\/img\/faces\/\d+-image\.jpg$/);
    }
  
    it('1. Respuesta básica OK', () => {
      cy.get('@apiResponse').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('application/json');
      });
    });
  
    it('2. Estructura básica del JSON', () => {
      cy.get('@apiResponse').then((response) => {
        // Verificar estructura principal
        expect(response.body).to.include.keys('page', 'per_page', 'total', 'total_pages', 'data');
        // Validar tipos de datos
        expect(response.body.page).to.be.a('number');
        expect(response.body.data).to.be.an('array');
      });
    });
  
    it('3. Paginación específica de page=2', () => {
      cy.get('@apiResponse').then((response) => {
        // Valores específicos para page=2
        expect(response.body.page).to.eq(2);
        expect(response.body.per_page).to.eq(6);
        expect(response.body.total).to.eq(12);
        expect(response.body.total_pages).to.eq(2);
        // Validar cantidad de resultados
        expect(response.body.data).to.have.lengthOf(6);
      });
    });
  
    it('4. Validar estructura de usuarios en data', () => {
      cy.get('@apiResponse').then((response) => {
        const users = response.body.data;
        // Verificar que data contiene elementos
        expect(users).to.be.an('array').and.not.empty;
        // Validar estructura y contenido de cada usuario
        users.forEach((user) => {
          validarEstructuraUsuario(user);
          // Adicional: asegurarse de que el id sea mayor o igual a 7 (para page=2)
          expect(user.id).to.be.gte(7);
        });
      });
    });
  
    it('5. Validar usuario específico conocido', () => {
      cy.get('@apiResponse').then((response) => {
        const users = response.body.data;
        const firstUser = users[0];
  
        // Verificar datos completos del primer usuario
        expect(firstUser).to.deep.equal({
          id: 7,
          email: 'michael.lawson@reqres.in',
          first_name: 'Michael',
          last_name: 'Lawson',
          avatar: 'https://reqres.in/img/faces/7-image.jpg'
        });
  
        // Verificar último usuario
        const lastUser = users[users.length - 1];
        expect(lastUser.id).to.eq(12);
        expect(lastUser.first_name).to.eq('Rachel');
      });
    });
  
    it('6. Validar formato de los avatares', () => {
      cy.get('@apiResponse').then((response) => {
        response.body.data.forEach(user => {
          // Verificar formato de URL del avatar
          expect(user.avatar).to.match(/^https:\/\/reqres\.in\/img\/faces\/\d+-image\.jpg$/);
        });
      });
    });
  });
  