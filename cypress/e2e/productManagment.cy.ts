describe("Admin Product Management Test", () => {
  const baseUrl = "http://localhost:5371";

  beforeEach(() => {
    cy.visit(`${baseUrl}/admin`);
  });

  describe("Product Management", () => {
    beforeEach(() => {
      cy.get("[data-test-id='product-tab']").click();
      cy.get("[data-test-id='add-product']").click();
      cy.url().should("include", "/admin/add-product");
    });

    it("Should successfully add a product with correct credentials", () => {
      cy.get("input[placeholder='Enter product name']").type("iPhone 12");
      cy.get("input[placeholder='Enter category']").type("Phone");
      cy.get("textarea[placeholder='Enter product description']").type(
        "Good and best performance phone"
      );
      cy.get("input[placeholder='Enter price']").type("19999");
      cy.get("input[placeholder='Enter stock quantity']").type("50");
      cy.get("[data-test-id='add-specification']").click();
      cy.get("input[placeholder='Key']").last().type("Weight");
      cy.get("input[placeholder='Value']").last().type("200g");
      cy.get("[data-test-id='add-specification']").click();
      cy.get("input[placeholder='Key']").last().type("Weight");
      cy.get("input[placeholder='Value']").last().type("200g");

      cy.get("button[type='submit']").click();
    });

    it("Should show validation errors when required fields are missing", () => {
      cy.get("button[type='submit']").click();
      cy.contains("Product Name is required").should("exist");
      cy.contains("Product Category is required").should("exist");
      cy.contains("Product Price is required").should("exist");
      cy.contains("Product Stock is required").should("exist");
    });

    it("Should prevent adding a product with invalid field values", () => {
      cy.get("input[placeholder='Enter product name']").type("iPhone 12");
      cy.get("input[placeholder='Enter category']").type("Phone");
      cy.get("textarea[placeholder='Enter product description']").type(
        "Good and best performance phone"
      );
      cy.get("input[placeholder='Enter price']").type("invalidPrice");
      cy.get("input[placeholder='Enter stock quantity']").type("50");
      cy.get("button[type='submit']").click();
      cy.contains("Invalid price").should("exist");
    });

    it("Should allow removing a specification before submission", () => {
      cy.get("[data-test-id='add-specification']").click();
      cy.get("input[placeholder='Key']").type("Screen Size");
      cy.get("input[placeholder='Value']").type("123x1240");
      cy.get("[data-test-id='remove-specification']").click(); // Removes the specification
      cy.get("input[placeholder='Key']").should("not.exist");
      cy.get("input[placeholder='Value']").should("not.exist");
    });
  });
});
