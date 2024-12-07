import ForgotPassword from "./ForgotPassword";
import "./../index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
const queryClient = new QueryClient();

function MockedForgotPassword() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ForgotPassword />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

describe("<ForgotPassword />", () => {
  it("Should Renders The Page", () => {
    cy.mount(<MockedForgotPassword />);
  });
  it("Should Renders The Email Input", () => {
    cy.mount(<MockedForgotPassword />);
    cy.get("label[for='email']").should("be.visible");
  });
  it("Should Renders The Send Reset Link Button", () => {
    cy.mount(<MockedForgotPassword />);
    cy.get("button[type='submit']").should("be.visible");
  });
  it("Should Renders The Back To Login Link", () => {
    cy.mount(<MockedForgotPassword />);
    cy.get("[data-test-id='login']").should("be.visible");
  });
});
