import React from "react";
import Index from "./Index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import "./../index.css";
const queryClient = new QueryClient();

function MockedIndex() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Index />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
describe("<Index />", () => {
  it("renders", () => {
    cy.mount(<MockedIndex />);
  });
});
