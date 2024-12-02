import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Navbar } from "@/components/Navbar";
import { Helmet } from "react-helmet";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProductAddEdit from "./features/adminProduct/ProductAddEdit";

const queryClient = new QueryClient({
  defaultOptions: {},
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="min-h-screen flex flex-col bg-dribbble-light">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Helmet>
                          <title>Home - Apple Cartopia</title>
                        </Helmet>
                        <Index />
                      </>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <>
                        <Helmet>
                          <title>Login - Apple Cartopia</title>
                        </Helmet>
                        <Login />
                      </>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <>
                        <Helmet>
                          <title>Products - Apple Cartopia</title>
                        </Helmet>
                        <ProductsPage />
                      </>
                    }
                  />
                  <Route
                    path="/products/:id"
                    element={
                      <>
                        <Helmet>
                          <title>Product Detail - Apple Cartopia</title>
                        </Helmet>
                        <ProductDetail />
                      </>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <>
                        <Helmet>
                          <title>Cart - Apple Cartopia</title>
                        </Helmet>
                        <Cart />
                      </>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <>
                        <Helmet>
                          <title>Checkout - Apple Cartopia</title>
                        </Helmet>
                        <Checkout />
                      </>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <>
                        <Helmet>
                          <title>Orders - Apple Cartopia</title>
                        </Helmet>
                        <Orders />
                      </>
                    }
                  />
                  <Route
                    path="/orders/:id"
                    element={
                      <>
                        <Helmet>
                          <title>Order Detail - Apple Cartopia</title>
                        </Helmet>
                        <OrderDetail />
                      </>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <>
                        <Helmet>
                          <title>Profile - Apple Cartopia</title>
                        </Helmet>
                        <Profile />
                      </>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <>
                        <Helmet>
                          <title>Admin Dashboard - Apple Cartopia</title>
                        </Helmet>
                        <AdminDashboard />
                      </>
                    }
                  />
                  <Route
                    path="/add-product"
                    element={
                      <>
                        <Helmet>
                          <title>Admin Dashboard - Apple Cartopia</title>
                        </Helmet>
                        <ProductAddEdit />
                      </>
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      <>
                        <Helmet>
                          <title>Sign Up - Apple Cartopia</title>
                        </Helmet>
                        <Signup />
                      </>
                    }
                  />
                  <Route
                    path="/forgot-password"
                    element={
                      <>
                        <Helmet>
                          <title>Forgot Password - Apple Cartopia</title>
                        </Helmet>
                        <ForgotPassword />
                      </>
                    }
                  />
                  <Route
                    path="/reset-password/:token"
                    element={
                      <>
                        <Helmet>
                          <title>Reset Password - Apple Cartopia</title>
                        </Helmet>
                        <ResetPassword />
                      </>
                    }
                  />
                </Routes>
              </main>
            </div>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
