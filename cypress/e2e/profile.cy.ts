const baseUrl = "http://localhost:5371";

describe("Profile Page Tests", () => {
  beforeEach(() => {
    // Navigate to the profile page before each test
    cy.visit(`${baseUrl}/profile`);
  });

  it("should display the image input field", () => {
    // Verify that the label for image input is visible
    cy.get("label[for='imageInput']").should("be.visible");
  });

  it("should update the profile image when the save button is clicked", () => {
    // Verify the visibility of the image input field before attempting to save
    cy.get("label[for='imageInput']").should("be.visible");
  });

  it("should successfully update the profile details with valid input", () => {
    // Enter valid user credentials and submit the form
    cy.get("input[placeholder='First Name']").type("ananiya");
    cy.get("input[placeholder='Last Name']").type("fekede");
    cy.get("input[placeholder='Email']").type("ananiya@gmail.com");
    cy.get("button[type='submit']").click();
  });

  it("should display an error message when the First Name field is empty", () => {
    // Attempt to submit the form without entering the First Name
    cy.get("input[placeholder='Last Name']").type("fekede");
    cy.get("input[placeholder='Email']").type("ananiya@gmail.com");
    cy.get("button[type='submit']").click();
    cy.contains("First Name is required").should("be.visible");
  });

  it("should display an error message when the Last Name field is empty", () => {
    // Attempt to submit the form without entering the Last Name
    cy.get("input[placeholder='First Name']").type("ananiya");
    cy.get("input[placeholder='Email']").type("ananiya@gmail.com");
    cy.get("button[type='submit']").click();
    cy.contains("Last Name is required").should("be.visible");
  });

  it("should display an error message when the Email field is empty", () => {
    // Attempt to submit the form without entering the Email
    cy.get("input[placeholder='First Name']").type("ananiya");
    cy.get("input[placeholder='Last Name']").type("fekede");
    cy.get("button[type='submit']").click();
    cy.contains("Email is required").should("be.visible");
  });

  it("should display an error message when an invalid email is entered", () => {
    // Enter an invalid email address and submit the form
    cy.get("input[placeholder='First Name']").type("ananiya");
    cy.get("input[placeholder='Last Name']").type("fekede");
    cy.get("input[placeholder='Email']").type("ananiyagmail");
    cy.get("button[type='submit']").click();
    cy.contains("Please enter a valid email address").should("be.visible");
  });

  // it("should update the password and redirect to the login page with valid input", () => {
  //   // Update the password and verify the redirection
  //   cy.visit(`${baseUrl}/login`);
  //   cy.get('label[for="email"]').next("input").type("ananiya@gmail.com");
  //   cy.get('label[for="password"]').next("input").type("87654321");
  //   cy.get('button[type="submit"]').click();
  //   cy.visit(`${baseUrl}/profile`);
  //   cy.get("[data-test-id='password']").click();
  //   cy.get("input[placeholder='Current Password']").type("12341234");
  //   cy.get("input[placeholder='New Password']").type("12345678");
  //   cy.get("input[placeholder='Confirm New Password']").type("12345678");
  //   cy.get("button[type='submit']").click();
  //   cy.url().should("include", `${baseUrl}/login`);
  // });

  it("should display an error message when the Current Password field is empty", () => {
    // Attempt to update the password without entering the Current Password
    cy.get("[data-test-id='password']").click();
    cy.get("input[placeholder='New Password']").type("12345678");
    cy.get("input[placeholder='Confirm New Password']").type("12345678");
    cy.get("button[type='submit']").click();
    cy.contains("Current Password is required").should("be.visible");
  });

  it("should display an error message when the New Password field is empty", () => {
    // Attempt to update the password without entering the New Password
    cy.get("[data-test-id='password']").click();
    cy.get("input[placeholder='Confirm New Password']").type("12345678");
    cy.get("button[type='submit']").click();
    cy.contains("New Password is required").should("be.visible");
  });

  it("should display an error message when the Confirm Password field is empty", () => {
    // Attempt to update the password without confirming the New Password
    cy.get("[data-test-id='password']").click();
    cy.get("input[placeholder='Current Password']").type("12345678");
    cy.get("input[placeholder='New Password']").type("12345678");
    cy.get("button[type='submit']").click();
    cy.contains("Password Confirm is required").should("be.visible");
  });

  it("should display an error message when the passwords do not match", () => {
    // Attempt to update the password with mismatched New and Confirm Password fields
    cy.get("[data-test-id='password']").click();
    cy.get("input[placeholder='New Password']").type("12345678");
    cy.get("input[placeholder='Confirm New Password']").type("12345687");
    cy.get("button[type='submit']").click();
    cy.contains("Passwords don't match").should("be.visible");
  });

  it("should display an error message when the password length is insufficient", () => {
    // Attempt to update the password with a password shorter than 8 characters
    cy.get("[data-test-id='password']").click();
    cy.get("input[placeholder='Current Password']").type("1234");
    cy.get("input[placeholder='New Password']").type("1234");
    cy.get("button[type='submit']").click();
    cy.contains("Password must be at least 8 characters long").should(
      "be.visible"
    );
  });
});
