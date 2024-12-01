describe("Reset Password", () => {
  const baseUrl = "http://localhost:5371";
  beforeEach(() => {
    cy.visit(`${baseUrl}/reset-password/token`);
  });
  it("Should successfully reset the password when a valid new password is entered.", () => {
    cy.get('label[for="password"]').type("87654321");
    cy.get('label[for="passwordConfirm"]').type("87654321");
    cy.get('button[type="submit"]').click();
    // cy.url().should("include", `${baseUrl}/login`);
  });
  it("Should display an error message if the password is not entered.", () => {
    cy.get('label[for="passwordConfirm"]').type("87654321");
    cy.get('button[type="submit"]').click();
    cy.contains("Password is required").should("be.visible");
  });
  it("Should display an error message if the password is not entered.", () => {
    cy.get('label[for="password"]').type("87654321");
    cy.get('button[type="submit"]').click();
    cy.contains("PasswordConfirm is required").should("be.visible");
  });

  it("Should display an error message if the password is less than the required length.", () => {
    cy.get('label[for="password"]').type("87654");
    cy.get('label[for="passwordConfirm"]').type("87654");
    cy.get('button[type="submit"]').click();
    cy.contains("Password must be at least 8 characters long").should(
      "be.visible"
    );
    cy.url().should("include", baseUrl);
  });
  it("Should display an error message if the password confirmation does not match the new password.", () => {
    cy.get('label[for="password"]').type("87654312");
    cy.get('label[for="passwordConfirm"]').type("87654321");
    cy.get('button[type="submit"]').click();
    cy.contains("Passwords don't match").should("be.visible");
  });
  // it(" Should display an error message if the reset token is invalid or expired.", () => {});
  // it("Should navigate to the login page after a successful password reset.", () => {});
  // it("Should display a success message after the password is reset.", () => {});
});

// RESET PASSWORD
// ------------------------ //

// Should successfully reset the password when a valid new password is entered.
// Should display an error message if the password is not entered.
// Should display an error message if the password does not meet complexity requirements (e.g., length, special characters).
// Should display an error message if the password confirmation does not match the new password.
// Should display an error message if the reset token is invalid or expired.
// Should navigate to the login page after a successful password reset.
// Should display a success message after the password is reset.
