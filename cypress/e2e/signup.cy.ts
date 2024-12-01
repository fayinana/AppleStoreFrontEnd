const baseUrl = "http://localhost:5371";

describe("Signup Page Test", () => {
  it("Should successfully sign up with valid details.", () => {
    cy.visit(`${baseUrl}/signup`);
    cy.get('label[for="firstName"]').type("ananiya");
    cy.get('label[for="lastName"]').type("fekede");
    cy.get('label[for="email"]').type("ananiya@gmail.com");
    cy.get('label[for="password"]').type("87654321");
    cy.get('label[for="passwordConfirm"]').type("87654321");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", baseUrl);
  });

  it("Should display an error message if the email is not entered.", () => {
    cy.visit(`${baseUrl}/signup`);
    cy.get('label[for="firstName"]').type("ananiya");
    cy.get('label[for="lastName"]').type("fekede");
    cy.get('label[for="password"]').type("87654321");
    cy.get('label[for="passwordConfirm"]').type("87654321");
    cy.get('button[type="submit"]').click();
    cy.contains("Email is required").should("be.visible");
    cy.url().should("include", `${baseUrl}/signup`);
  });
  it("Should display an error message if the password is not entered.", () => {
    cy.visit(`${baseUrl}/signup`);
    cy.get('label[for="firstName"]').type("ananiya");
    cy.get('label[for="lastName"]').type("fekede");
    cy.get('label[for="email"]').type("ananiya@gmail.com");
    cy.get('label[for="passwordConfirm"]').type("87654321");
    cy.get('button[type="submit"]').click();
    cy.contains("Password is required").should("be.visible");
    cy.url().should("include", `${baseUrl}/signup`);
  });
  it("Should display an error message if all email, password, firstName, lastName, and passwordConfirm are not entered.", () => {
    cy.visit(`${baseUrl}/signup`);
    cy.get('button[type="submit"]').click();
    cy.contains("Password is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Last name is required").should("be.visible");
    cy.contains("First name is required").should("be.visible");
    cy.contains("Password confirmation is required").should("be.visible");
    cy.url().should("include", `${baseUrl}/signup`);
  });
  it("Should display an error message if the firstName is not entered.", () => {
    cy.visit(`${baseUrl}/signup`);
    cy.get('label[for="lastName"]').type("fekede");
    cy.get('label[for="email"]').type("ananiya@gmail.com");
    cy.get('label[for="password"]').type("87654321");
    cy.get('label[for="passwordConfirm"]').type("87654321");
    cy.get('button[type="submit"]').click();
    cy.contains("First name is required").should("be.visible");
    cy.url().should("include", `${baseUrl}/signup`);
  });
  it("Should display an error message if the lastName is not entered.", () => {
    cy.visit(`${baseUrl}/signup`);
    cy.get('label[for="firstName"]').type("ananiya");
    cy.get('label[for="email"]').type("ananiya@gmail.com");
    cy.get('label[for="password"]').type("87654321");
    cy.get('label[for="passwordConfirm"]').type("87654321");
    cy.get('button[type="submit"]').click();
    cy.contains("Last name is required").should("be.visible");
    cy.url().should("include", `${baseUrl}/signup`);
  });
  it("Should display an error message if the passwordConfirm is not entered.", () => {
    cy.visit(`${baseUrl}/signup`);
    cy.get('label[for="firstName"]').type("ananiya");
    cy.get('label[for="lastName"]').type("fekede");
    cy.get('label[for="password"]').type("87654321");
    cy.get('button[type="submit"]').click();
    cy.contains("Password confirmation is required").should("be.visible");
    cy.url().should("include", `${baseUrl}/signup`);
  });
  it("Should display an error message if the password not the same as  passwordConfirm.", () => {
    cy.visit(`${baseUrl}/signup`);
    cy.get('label[for="firstName"]').type("ananiya");
    cy.get('label[for="lastName"]').type("fekede");
    cy.get('label[for="email"]').type("fekede@gmail.com");
    cy.get('label[for="password"]').type("87654312");
    cy.get('label[for="passwordConfirm"]').type("87654321");
    cy.get('button[type="submit"]').click();
    cy.contains("Passwords don't match").should("be.visible");
    cy.url().should("include", `${baseUrl}/signup`);
  });
  it("Should display an error message if the email format is invalid.", () => {
    cy.visit(`${baseUrl}/signup`);
    cy.get('label[for="firstName"]').type("ananiya");
    cy.get('label[for="lastName"]').type("fekede");
    cy.get('label[for="email"]').type("ananiyagmailcom");
    cy.get('label[for="password"]').type("87654321");
    cy.get('label[for="passwordConfirm"]').type("87654321");
    cy.get('button[type="submit"]').click();
    cy.contains("Please enter a valid email address").should("be.visible");
    cy.url().should("include", baseUrl);
  });
  it("Should display an error message if the password is less than the required length.", () => {
    cy.visit(`${baseUrl}/signup`);
    cy.get('label[for="firstName"]').type("ananiya");
    cy.get('label[for="lastName"]').type("fekede");
    cy.get('label[for="email"]').type("ananiya@gmail.com");
    cy.get('label[for="password"]').type("87654");
    cy.get('label[for="passwordConfirm"]').type("87654");
    cy.get('button[type="submit"]').click();
    cy.contains("Password must be at least 8 characters long").should(
      "be.visible"
    );
    cy.url().should("include", baseUrl);
  });
  it("Should navigate to the login page when the 'Already have an account' link is clicked.", () => {
    cy.visit(`${baseUrl}/signup`);
    cy.get('[data-test-id="login"]').click();
    cy.url().should("include", `${baseUrl}/login`);
  });

  //TODO:
  // it("Should display an error message if the email is already registered.", () => {
  //   cy.visit(`${baseUrl}/signup`);
  //   cy.get('label[for="firstName"]').type("ananiya");
  //   cy.get('label[for="lastName"]').type("fekede");
  //   cy.get('label[for="email"]').type("ananiya@gmail.com");
  //   cy.get('label[for="password"]').type("87654321");
  //   cy.get('label[for="passwordConfirm"]').type("87654321");
  //   cy.get('button[type="submit"]').click();
  //   cy.url().should("include", baseUrl);
  // });
  // it("Should display appropriate feedback messages on successful signup.", () => {
  //   cy.visit(`${baseUrl}/signup`);
  //   cy.get('label[for="firstName"]').type("ananiya");
  //   cy.get('label[for="lastName"]').type("fekede");
  //   cy.get('label[for="email"]').type("ananiya@gmail.com");
  //   cy.get('label[for="password"]').type("87654321");
  //   cy.get('label[for="passwordConfirm"]').type("87654321");
  //   cy.get('button[type="submit"]').click();
  //   cy.url().should("include", baseUrl);
  // });
});
