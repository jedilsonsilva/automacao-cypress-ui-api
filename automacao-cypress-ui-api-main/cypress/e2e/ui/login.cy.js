describe("login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  function criarUsuario(administrador = "true") {
    const usuario = {
      nome: "João Teste",
      email: `joao${Date.now()}@teste.com`,
      password: "teste123",
      administrador,
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

  function deletarUsuario(administrador = "true") {
    criarUsuario(administrador).then(({ id }) => {
      return cy
        .request({
          method: "DELETE",
          url: `https://serverest.dev/usuarios/${id}`,
        })
        .then((res) => {
          return {
            id: res.body._id,
          };
        });
    });
  }

  context("sucesso", () => {
    let perfilAdmin;
    let perfilUser;

    afterEach(() => {
      cy.getByTestId("logout").click();
      cy.url().should("eq", "https://front.serverest.dev/login");
      if (perfilAdmin) deletarUsuario(perfilAdmin);
      if (perfilUser) deletarUsuario(perfilUser);
    });

    it("deve validar login de usuário admin com sucesso", () => {
      criarUsuario("true").then(({ usuarioCriado, perfil}) => {
        perfilAdmin = perfil;
        cy.getByTestId("email").type(usuarioCriado.email);
        cy.getByTestId("senha").type("teste123");
        cy.clickButton("Entrar");
        cy.url().should("eq", "https://front.serverest.dev/admin/home");
      });
    });

    it("deve validar login de usuário não admin com sucesso", () => {
      criarUsuario("false").then(({ usuarioCriado, perfil }) => {
        perfilUser = perfil;
        cy.getByTestId("email").type(usuarioCriado.email);
        cy.getByTestId("senha").type("teste123");
        cy.clickButton("Entrar");
        cy.url().should("eq", "https://front.serverest.dev/home");
      });
    });
  });

  context("exceção", () => {
    afterEach(() => {
      cy.get(".btn-close-error-alert").click();
    });

    it("deve validar email não preenchido", () => {
      cy.getByTestId("senha").type("teste1234");
      cy.clickButton("Entrar");
      cy.contains("Email é obrigatório").should("be.visible");
    });

    it("deve validar senha não preenchida", () => {
      cy.getByTestId("email").type("jedilsondemelo2@gmail.com");
      cy.clickButton("Entrar");
      cy.contains("Password é obrigatório").should("be.visible");
    });

    it("deve validar email inválido", () => {
      cy.getByTestId("email").type("teste1234@teste21.com");
      cy.getByTestId("senha").type("1234teste");
      cy.clickButton("Entrar");
      cy.contains("Email e/ou senha inválidos").should("be.visible");
    });

    it("deve validar senha inválida", () => {
      cy.getByTestId("email").type("jedilsondemelo@gmail.com");
      cy.getByTestId("senha").type("1234teste");
      cy.clickButton("Entrar");
      cy.contains("Email e/ou senha inválidos").should("be.visible");
    });
  });
});
