import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
import SignIn from "../pages/SignIn";
import ProductDetials from "../pages/ProductDetials";
import SignUp from "../pages/SignUp";
import Cart from "../pages/Cart";
import Addresses from "../pages/Addresses";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import OrderDetials from "../pages/OrderDetials";
import ProductsPage from "../pages/ProductsPage";
import AuthRoute from "../components/routing/AuthRoute";
import UnAuthRoute from "../components/routing/UnAuthRoute";
import TrackingOrder from "../pages/TrackingOrder";
import Survey from "../pages/Survey";
import UpdateSurvey from "../pages/UpdateSurvey";

// Admin imports
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../features/admin/AdminDashboard";
import AdminProducts from "../features/admin/AdminProducts";
import AdminCategories from "../features/admin/AdminCategories";
import AdminOrders from "../features/admin/AdminOrders";
import AdminCustomers from "../features/admin/AdminCustomers";
import AdminSettings from "../features/admin/AdminSettings";

export const router = createBrowserRouter([
  /* ─── Layout 1: Client (Navbar + Footer) ─── */
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <AuthRoute>
            <Home />
          </AuthRoute>
        ),
      },
      {
        path: "products",
        element: (
          <AuthRoute>
            <ProductsPage />
          </AuthRoute>
        ),
      },
      {
        path: "products/:id",
        element: (
          <AuthRoute>
            <ProductDetials />
          </AuthRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <AuthRoute>
            <Cart />
          </AuthRoute>
        ),
      },
      {
        path: "addresses",
        element: (
          <AuthRoute>
            <Addresses />
          </AuthRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <AuthRoute>
            <Profile />
          </AuthRoute>
        ),
      },
      {
        path: "profile/survey",
        element: (
          <AuthRoute>
            <Survey />
          </AuthRoute>
        ),
      },
      {
        path: "profile/updateSurvey",
        element: (
          <AuthRoute>
            <UpdateSurvey />
          </AuthRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <AuthRoute>
            <Orders />
          </AuthRoute>
        ),
      },
      {
        path: "orders/:id",
        element: (
          <AuthRoute>
            <OrderDetials />
          </AuthRoute>
        ),
      },
      { path: "orders/:id/track", element: <TrackingOrder /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  /* ─── Layout 2: Auth (Clean, no navbar/footer) ─── */
  {
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: (
          <UnAuthRoute>
            <SignIn />
          </UnAuthRoute>
        ),
      },
      {
        path: "sign-up",
        element: (
          <UnAuthRoute>
            <SignUp />
          </UnAuthRoute>
        ),
      },
    ],
  },

  /* ─── Layout 3: Admin Dashboard (Sidebar) ─── */
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "categories", element: <AdminCategories /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "customers", element: <AdminCustomers /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },
]);
