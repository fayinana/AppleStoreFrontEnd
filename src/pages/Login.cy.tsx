import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./../index.css";
const queryClient = new QueryClient();

function MockedLogin() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

describe("<Login />", () => {
  it("Should The Page Render Correctly", () => {
    cy.mount(<MockedLogin />);
  });

  it("Should The Link To Signup Render Correctly", () => {
    cy.mount(<MockedLogin />);
    cy.get("[data-test-id='signup']").should("be.visible");
  });

  it("Should The Link To ForgotPassword Render Correctly", () => {
    cy.mount(<MockedLogin />);
    cy.get("[data-test-id='forgot-password']").should("be.visible");
  });

  it("Should The Email Input Render Correctly", () => {
    cy.mount(<MockedLogin />);
    cy.get("label[for='email']").should("be.visible");
  });

  it("Should The Password Input Render Correctly", () => {
    cy.mount(<MockedLogin />);
    cy.get("label[for='password']").should("be.visible");
  });

  it("Should The SignIn Button Render Correctly", () => {
    cy.mount(<MockedLogin />);
    cy.get("button[type='submit']").should("be.visible");
  });
});
