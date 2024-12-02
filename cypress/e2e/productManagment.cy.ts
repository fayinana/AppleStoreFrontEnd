describe("Forgot Password Test", () => {
  const baseUrl = "http://localhost:5371";
  beforeEach(() => {
    cy.visit(`${baseUrl}/forgot-password`);
  });
});
