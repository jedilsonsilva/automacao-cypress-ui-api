Cypress.Commands.add("getByTestId", (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add("clickButton", (button) => {
  cy.contains("button", button).click();
});

Cypress.Commands.add("generateFullName", () => {
  const firstNames = ["John", "Jane", "Michael", "Sarah", "David", "Emma"];
  const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Taylor", "Anderson"];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${lastName}`;
});

Cypress.Commands.add("generateEmail", () => {
  const domains = ["gmail.com", "yahoo.com", "outlook.com"];
  const randomString = Math.random().toString(36).substring(7); // Gera uma string aleatória

  const domain = domains[Math.floor(Math.random() * domains.length)];

  return `${randomString}@${domain}`;
});
