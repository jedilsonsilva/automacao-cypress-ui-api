describe("ServeRest - API Usuários", () => {
  function criarUsuario() {
    const usuario = {
      nome: "João Teste",
      email: `joao${Date.now()}@teste.com`,
      password: "teste123",
      administrador: "true",
    };

    return cy
      .request({
        method: "POST",
        url: "https://serverest.dev/usuarios",
        body: usuario,
        failOnStatusCode: false,
      })
      .then((res) => {
        return {
          id: res.body._id,
          usuarioCriado: usuario,
        };
      });
  }

  function criarUsuarioComVariaveis(nome, email, password, administrador) {
    const usuario = {
      nome: nome,
      email: email,
      password: password,
      administrador: administrador,
    };

    return cy
      .request({
        method: "POST",
        url: "https://serverest.dev/usuarios",
        body: usuario,
        failOnStatusCode: false,
      })
      .then((res) => {
        return { id: res.body._id };
      });
  }

  context("sucesso", () => {
    it("deve criar um novo usuário com sucesso", () => {
      const usuario = {
        nome: "João Teste",
        email: `joao${Date.now()}@teste.com`,
        password: "teste123",
        administrador: "true",
      };

      cy.request({
        method: "POST",
        url: "https://serverest.dev/usuarios",
        body: usuario,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq("Cadastro realizado com sucesso");
        expect(res.body._id).to.exist;
      });
    });

    it("deve buscar usuário por Id com sucesso", () => {
      criarUsuario().then(({ id, usuarioCriado }) => {
        cy.request({
          method: "GET",
          url: `https://serverest.dev/usuarios/${id}`,
          failOnStatusCode: false,
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property("_id", id);
          expect(res.body).to.have.property("nome", usuarioCriado.nome);
          expect(res.body).to.have.property("email", usuarioCriado.email);
        });
      });
    });

    it("deve editar usuário com sucesso", () => {
      const usuarioEditado = {
        nome: "João Teste Editado",
        email: `joao${Date.now()}@editado.com`,
        password: "testeEditado",
        administrador: "false",
      };

      criarUsuario().then(({ id }) => {
        cy.request({
          method: "PUT",
          url: `https://serverest.dev/usuarios/${id}`,
          body: usuarioEditado,
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq("Registro alterado com sucesso");
        });
      });
    });
  });

  context("exceção", () => {
    it("deve validar email já usado", () => {
      const emailDuplicado = "teste@teste123.com.br";

      criarUsuarioComVariaveis(emailDuplicado).then(() => {
        criarUsuarioComVariaveis(`teste${Date.now()}@email.com`).then(({ id }) => {
          const usuarioEditado = {
            nome: "João Teste Editado",
            email: emailDuplicado, 
            password: "testeEditado",
            administrador: "false",
          };

          cy.request({
            method: "PUT",
            url: `https://serverest.dev/usuarios/${id}`,
            body: usuarioEditado,
            failOnStatusCode: false,
          }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body.message).to.eq("Este email já está sendo usado");
          });
        });
      });
    });
  });
});
