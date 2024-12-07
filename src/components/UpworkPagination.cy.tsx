import { UpworkPagination } from "./UpworkPagination";
import "./../index.css";
import { useState } from "react";

describe("<UpworkPagination />", () => {
  it("renders and navigates pages correctly", () => {
    // Define a state to manage the current page
    const Wrapper = () => {
      const [currentPage, setCurrentPage] = useState(1);

      return (
        <UpworkPagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      );
    };

    // Mount the component
    cy.mount(<Wrapper />);

    // Verify the component renders
    cy.get("[data-testid='pagination']").should("exist");

    // Assert the initial state
    cy.contains("[data-testid='pagination-link']", "1").should(
      "have.class",
      "bg-dribbble-primary"
    );

    // Navigate to the next page
    cy.get("[data-testid='pagination-next']").click();

    // Verify the state change
    cy.contains("[data-testid='pagination-link']", "2").should(
      "have.class",
      "bg-dribbble-primary"
    );

    // Navigate to the last page
    cy.get("[data-testid='pagination-link']").contains("10").click();

    // Verify the last page is active
    cy.contains("[data-testid='pagination-link']", "10").should(
      "have.class",
      "bg-dribbble-primary"
    );

    // Verify the "Next" button is disabled on the last page
    cy.get("[data-testid='pagination-next']").should(
      "have.class",
      "opacity-50"
    );
  });
});
