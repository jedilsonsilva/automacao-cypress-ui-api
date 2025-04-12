describe("cadastroUsuario", () => {
  beforeEach(() => {
    criarUsuario("true").then(({ usuarioCriado }) => {
      cy.visit("/");
      cy.getByTestId("email").type(usuarioCriado.email);
      cy.getByTestId("senha").type("teste123");
      cy.clickButton("Entrar");
      cy.getByTestId("cadastrarUsuarios").should("be.visible").click();
    });
  });

  afterEach(() => {
    cy.getByTestId("logout").click();
    cy.url().should("eq", "https://front.serverest.dev/login");
    deletarUsuario();
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

  function deletarUsuario() {
    criarUsuario("true").then(({ id }) => {
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

  function gerarNome() {
    const firstNames = ["John", "Jane", "Michael", "Sarah", "David", "Emma"];
    const lastNames = [
      "Doe",
      "Smith",
      "Johnson",
      "Brown",
      "Taylor",
      "Anderson",
    ];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${firstName} ${lastName}`;
  }

  function gerarEmail() {
    const domains = ["gmail.com", "yahoo.com", "outlook.com"];
    const randomString = Math.random().toString(36).substring(7);

    const domain = domains[Math.floor(Math.random() * domains.length)];

    return `${randomString}@${domain}`;
  }

  context("sucesso", () => {
    it("deve validar cadastro de usuário admin com sucesso", () => {
      const nome = gerarNome();
      cy.getByTestId("nome").type(nome);
      cy.getByTestId("email").type(gerarEmail());
      cy.getByTestId("password").type("teste1234");
      cy.getByTestId("checkbox").check();
      cy.getByTestId("cadastrarUsuario").click();
      cy.contains("td", nome).scrollIntoView().should("be.visible");
    });

    it("deve validar cadastro de usuário não admin com sucesso", () => {
      const nome = gerarNome();
      cy.getByTestId("nome").type(nome);
      cy.getByTestId("email").type(gerarEmail());
      cy.getByTestId("password").type("teste1234");
      cy.getByTestId("cadastrarUsuario").click();
      cy.contains("td", nome).scrollIntoView().should("be.visible");
    });
  });

  context("exceção", () => {
    afterEach(() => {
      cy.get(".btn-close-error-alert").click();
    });

    it("deve validar campo nome não prenchido", () => {
      cy.getByTestId("email").type(gerarEmail());
      cy.getByTestId("password").type("teste1234");
      cy.getByTestId("cadastrarUsuario").click();
      cy.contains("Nome é obrigatório").should("be.visible");
    });

    it("deve validar campo email não prenchido", () => {
      cy.getByTestId("nome").type(gerarNome());
      cy.getByTestId("password").type("teste1234");
      cy.getByTestId("cadastrarUsuario").click();
      cy.contains("Email é obrigatório").should("be.visible");
    });

    it("deve validar campo senha não prenchido", () => {
      cy.getByTestId("nome").type(gerarNome());
      cy.getByTestId("email").type(gerarEmail());
      cy.getByTestId("cadastrarUsuario").click();
      cy.contains("Password é obrigatório").should("be.visible");
    });
  });
});
