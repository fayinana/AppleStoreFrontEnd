describe("Login Page Functionality", () => {
  const baseUrl = "http://localhost:5371";

  // Test case for successful login
  it("logs in successfully with valid credentials", () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('label[for="email"]').next("input").type("fekedeananiya@gmail.com");
    cy.get('label[for="password"]').next("input").type("87654321");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", baseUrl);
  });

  // Test case for missing email input
  it("displays an error message if the email is not entered", () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('label[for="password"]').next("input").type("87654321");
    cy.get('button[type="submit"]').click();
    cy.contains("Email is required").should("be.visible");
  });

  // Test case for missing password input
  it("displays an error message if the password is not entered", () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('label[for="email"]').next("input").type("fekedeananiya@gmail.com");
    cy.get('button[type="submit"]').click();
    cy.contains("Password is required").should("be.visible");
  });

  // Test case for missing both email and password inputs
  it("displays error messages if both email and password are not entered", () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('button[type="submit"]').click();
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });
  it("Should display an error message if the email format is invalid.", () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('label[for="email"]').type("ananiyagmailcom");
    cy.get('label[for="password"]').type("87654321");
    cy.get('button[type="submit"]').click();
    cy.contains("Please enter a valid email address").should("be.visible");
    cy.url().should("include", baseUrl);
  });
  it("Should display an error message if the password is less than the required length.", () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('label[for="email"]').type("ananiya@gmail.com");
    cy.get('label[for="password"]').type("87654");
    cy.get('button[type="submit"]').click();
    cy.contains("Password must be at least 8 characters long").should(
      "be.visible"
    );
    cy.url().should("include", baseUrl);
  });
  // Test case for navigation to the signup page
  it("navigates to the signup page when 'Create Account' is clicked", () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('[data-test-id="signup"]').click();
    cy.url().should("include", `${baseUrl}/signup`);
  });

  // Test case for navigation to the forgot-password page
  it("navigates to the forgot-password page when 'Forgot Password' is clicked", () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('[data-test-id="forgot-password"]').click();
    cy.url().should("include", `${baseUrl}/forgot-password`);
  });
});
