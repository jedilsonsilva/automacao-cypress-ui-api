# 📌 Projeto de Testes Automatizados com Cypress

Este projeto tem como objetivo demonstrar a automação de testes E2E utilizando o framework [Cypress](https://www.cypress.io/) com a linguagem JavaScript, aplicando boas práticas de desenvolvimento, clareza nas assertivas e organização dos cenários de teste.

## 🚀 Tecnologias utilizadas

- [Cypress](https://docs.cypress.io/)
- JavaScript (ES6+)
- Node.js

## 🧪 Cenários de Teste

Foram desenvolvidos **11 cenários de testes E2E para o frontend** e **3 cenários de testes para a API** da aplicação [Serverest](https://serverest.dev/).

---

### 🌐 Frontend - https://front.serverest.dev/

Testes automatizados utilizando o Cypress para validar funcionalidades críticas da interface:

- ✅ Login com usuário administrador.
- ✅ Login com usuário não administrador.
- ✅ Validações de exceções de login (email ou senha inválidos, campos obrigatórios, etc).

---

### 📡 API - https://serverest.dev/

Testes de API utilizando o `cy.request()`:

- ✅ Criação de usuário via API.
- ✅ Busca de usuário por ID.
- ✅ Validação de erro ao tentar cadastrar um email já utilizado.

---

## 🗂 Estrutura do Projeto


