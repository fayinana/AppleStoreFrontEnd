import ProductsManagement from "./ProductsManagement";

// function MockedProductManagement(){
//   <
// }
describe("<ProductsManagement />", () => {
  it("renders", () => {
    cy.mount(<ProductsManagement />);
  });
});
