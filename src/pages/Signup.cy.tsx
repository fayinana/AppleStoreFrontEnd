import "./../index.css";
import Signup from "./Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
const queryClient = new QueryClient();

function MockedSignup() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Signup />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

describe("<Signup />", () => {
  it("renders the Signup component", () => {
    cy.mount(<MockedSignup />);
  });

  it("renders the login link", () => {
    cy.mount(<MockedSignup />);
    cy.get("[data-test-id='login']").should("be.visible");
  });

  it("renders the First Name input field", () => {
    cy.mount(<MockedSignup />);
    cy.get("label[for='firstName']").should("be.visible");
  });

  it("renders the Last Name input field", () => {
    cy.mount(<MockedSignup />);
    cy.get("label[for='lastName']").should("be.visible");
  });

  it("renders the Email input field", () => {
    cy.mount(<MockedSignup />);
    cy.get("label[for='email']").should("be.visible");
  });
  it("renders the Password input field", () => {
    cy.mount(<MockedSignup />);
    cy.get("label[for='password']").should("be.visible");
  });

  it("renders the Password Confirmation input field", () => {
    cy.mount(<MockedSignup />);
    cy.get("label[for='passwordConfirm']").should("be.visible");
  });

  it("renders the Signup button", () => {
    cy.mount(<MockedSignup />);
    cy.get("button[type='submit']").should("be.visible");
  });
});
