describe("Forgot Password Test", () => {
  const baseUrl = "http://localhost:5371";
  beforeEach(() => {
    cy.visit(`${baseUrl}/forgot-password`);
  });
  it("Should display an error message if the email is not entered.", () => {
    cy.get("button[type='submit']").click();
    cy.contains("Email is required").should("be.visible");
  });
  it("Should display an error message if an invalid email format is entered.", () => {
    cy.get('label[for="email"]').type("ananiyagmailcom");
    cy.get('button[type="submit"]').click();
    cy.contains("Please enter a valid email address").should("be.visible");
  });
  // TODO:
  // it("Should send a reset password email when a valid email is entered.", () => {
  //   cy.get("label[for='email']").type("ananiyafekede@gmail.com");
  //   cy.get("button[type='submit']").click();
  //   cy.contains(
  //     "Please check your email for password reset instructions."
  //   ).should("be.visible");
  // });
  // it("Should display an error message if the entered email is not registered.", () => {});
  // it("Should display a success message when the reset password email is sent.", () => {});
  it("Should navigate to the login page when the 'Back to Login' link is clicked.", () => {
    cy.get('[data-test-id="login"]').click();
    cy.url().should("include", `${baseUrl}/login`);
  });
});

//                                                                    FORGOT PASSWORd                                                                     //

// Should send a reset password email when a valid email is entered.
// Should display an error message if the email is not entered.
// Should display an error message if an invalid email format is entered.
// Should display an error message if the entered email is not registered.
// Should display a success message when the reset password email is sent.
// Should navigate to the login page when the "Back to Login" link is clicked.
