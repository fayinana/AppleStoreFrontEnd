import React from "react";
import Profile from "./Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import "./../index.css";

const queryClient = new QueryClient();

function MockedProfile() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Profile />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

describe("<Profile /> Component Tests", () => {
  it("should render the Profile page without errors", () => {
    cy.mount(<MockedProfile />);
  });

  it("should render the First Name input field on the Profile page", () => {
    cy.mount(<MockedProfile />);
    cy.get("input[placeholder='First Name']").should("be.visible");
  });

  it("should render the Last Name input field on the Profile page", () => {
    cy.mount(<MockedProfile />);
    cy.get("input[placeholder='Last Name']").should("be.visible");
  });

  it("should render the Email input field on the Profile page", () => {
    cy.mount(<MockedProfile />);
    cy.get("input[placeholder='Email']").should("be.visible");
  });

  it("should display the Current Password input field on the Password update page", () => {
    cy.mount(<MockedProfile />);
    cy.get("[data-test-id='password']").click();
    cy.get("input[placeholder='Current Password']").should("be.visible");
  });

  it("should display the New Password input field on the Password update page", () => {
    cy.mount(<MockedProfile />);
    cy.get("[data-test-id='password']").click();
    cy.get("input[placeholder='New Password']").should("be.visible");
  });

  it("should display the Confirm New Password input field on the Password update page", () => {
    cy.mount(<MockedProfile />);
    cy.get("[data-test-id='password']").click();
    cy.get("input[placeholder='Confirm New Password']").should("be.visible");
  });

  it("should verify the visibility of the Profile tab", () => {
    cy.mount(<MockedProfile />);
    cy.get("[data-test-id='profile']").should("be.visible");
  });

  it("should verify the visibility of the Password tab", () => {
    cy.mount(<MockedProfile />);
    cy.get("[data-test-id='password']").should("be.visible");
  });

  it("should render the image input field for profile picture upload", () => {
    cy.mount(<MockedProfile />);
    cy.get("label[for='imageInput']").should("be.visible");
  });

  it("should render the Save button on the Profile update form", () => {
    cy.mount(<MockedProfile />);
    cy.get("button[type='submit']").should("be.visible");
  });

  it("should render the Save button on the Password update form", () => {
    cy.mount(<MockedProfile />);
    cy.get("[data-test-id='password']").click();
    cy.get("button[type='submit']").should("be.visible");
  });
});
