import ResetPassword from "./ResetPassword";
import "./../index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
const queryClient = new QueryClient();

function MockedResetPassword() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ResetPassword />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
describe("<ResetPassword />", () => {
  it("Should Renders The ResetPassword Page", () => {
    cy.mount(<MockedResetPassword />);
  });
  it("Should Renders The Password Input", () => {
    cy.mount(<MockedResetPassword />);
    cy.get("label[for='password']").should("be.visible");
  });
  it("Should Renders The PasswordConfirm Input", () => {
    cy.mount(<MockedResetPassword />);
    cy.get("label[for='passwordConfirm']").should("be.visible");
  });
  it("Should Renders The Reset Button", () => {
    cy.mount(<MockedResetPassword />);
    cy.get("button[type='submit']").should("be.visible");
  });
});
