import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Helmet } from "react-helmet";
import LoadingSpinner from "./components/Spinner";
import { ProtectedRoute } from "./components/ProtectedRoute";
import UnauthorizedPage from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Lazy load components
const Index = React.lazy(() => import("./pages/Index"));
const Login = React.lazy(() => import("./pages/Login"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Orders = React.lazy(() => import("./pages/Orders"));
const OrderDetail = React.lazy(() => import("./pages/OrderDetail"));
const Profile = React.lazy(() => import("./pages/Profile"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const Signup = React.lazy(() => import("./pages/Signup"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const ProductAddEdit = React.lazy(
  () => import("./features/adminProduct/ProductAddEdit")
);
const Dashboard = React.lazy(() => import("./features/dashboard/Dashboard"));
const CheckoutSuccess = React.lazy(
  () => import("./features/checkout/CheckoutSuccess")
);

const queryClient = new QueryClient({
  defaultOptions: {},
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-dribbble-light">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
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
                      <Products />
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
                    <ProtectedRoute allowedRoles={["admin", "user"]}>
                      <Helmet>
                        <title>Cart - Apple Cartopia</title>
                      </Helmet>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "user"]}>
                      <Helmet>
                        <title>Checkout - Apple Cartopia</title>
                      </Helmet>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkoutSuccess/:id"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "user"]}>
                      <Helmet>
                        <title>Checkout - Apple Cartopia</title>
                      </Helmet>
                      <CheckoutSuccess />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "user"]}>
                      <Helmet>
                        <title>Orders - Apple Cartopia</title>
                      </Helmet>
                      <Orders />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/order/:id"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "user"]}>
                      <Helmet>
                        <title>Order Detail - Apple Cartopia</title>
                      </Helmet>
                      <OrderDetail />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "user"]}>
                      <Helmet>
                        <title>Profile - Apple Cartopia</title>
                      </Helmet>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "user"]}>
                      <Helmet>
                        <title>User Dashboard - Apple Cartopia</title>
                      </Helmet>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <Helmet>
                        <title>Admin Dashboard - Apple Cartopia</title>
                      </Helmet>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="admin/add-product"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <Helmet>
                        <title>Admin Dashboard - Add New Product</title>
                      </Helmet>
                      <ProductAddEdit />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="admin/edit-product/:id"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <Helmet>
                        <title>Admin Dashboard - Edit Product</title>
                      </Helmet>
                      <ProductAddEdit />
                    </ProtectedRoute>
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
                  path="/unauthorized"
                  element={
                    <>
                      <Helmet>
                        <title>Unauthorized - Apple Cartopia</title>
                      </Helmet>
                      <UnauthorizedPage />
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
                <Route
                  path="*"
                  element={
                    <>
                      <Helmet>
                        <title>404 Not Found - Apple Cartopia</title>
                      </Helmet>
                      <NotFound />
                    </>
                  }
                />
              </Routes>
            </Suspense>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
    <Toaster
      position="bottom-right"
      gutter={12}
      containerStyle={{
        margin: "6px",
      }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        className:
          "font-sans text-base max-w-lg p-2 bg-gray-50 text-gray-700 rounded shadow-lg",
      }}
    />
  </QueryClientProvider>
);

export default App;
