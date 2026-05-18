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
import OrderConfirmed from "../pages/OrderConfirmed";
import ProductsPage from "../pages/ProductsPage";
import CategoriesPage from "../pages/CategoriesPage";
import PaymentMethods from "../pages/PaymentMethods";
import Checkout from "../pages/Checkout";
import AuthRoute from "../components/routing/AuthRoute";
import UnAuthRoute from "../components/routing/UnAuthRoute";
import TrackingOrder from "../pages/TrackingOrder";
import Survey from "../pages/Survey";
import UpdateSurvey from "../pages/UpdateSurvey";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

// Admin imports
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../features/admin/AdminDashboard";
import AdminProducts from "../features/admin/AdminProducts";
import AdminAnalytics from "../features/admin/AdminAnalytics";
import AdminEditProduct from "../features/admin/AdminEditProduct";
import AdminCategories from "../features/admin/AdminCategories";
import AdminOrders from "../features/admin/AdminOrders";
import AdminCustomers from "../features/admin/AdminCustomers";
import AdminSettings from "../features/admin/AdminSettings";
import AdminLogin from "../features/admin/AdminLogin";
import AdminRoute from "../components/routing/AdminRoute";

import IngredientsGuide from "../pages/IngredientsGuide";
import Wishlist from "../pages/Wishlist";
import SurveyResult from "../pages/SurveyResult";
import ContactSupport from "../pages/ContactSupport";
import FAQs from "../pages/FAQs";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import CMSPage from "../pages/CMSPage";

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
      { path: "contact", element: <ContactSupport /> },
      { path: "faqs", element: <FAQs /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <BlogPost /> },
      { path: "about", element: <CMSPage pageKey="about" /> },
      { path: "privacy-policy", element: <CMSPage pageKey="privacy_policy" /> },
      { path: "terms", element: <CMSPage pageKey="terms" /> },
      { path: "returns", element: <CMSPage pageKey="returns_policy" /> },
      {
        path: "survey-result",
        element: (
          <AuthRoute>
            <SurveyResult />
          </AuthRoute>
        ),
      },
      {
        path: "ingredients",
        element: <IngredientsGuide />,
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
        path: "categories",
        element: (
          <AuthRoute>
            <CategoriesPage />
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
        path: "checkout",
        element: (
          <AuthRoute>
            <Checkout />
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
        path: "payment-methods",
        element: (
          <AuthRoute>
            <PaymentMethods />
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
        path: "wishlist",
        element: (
          <AuthRoute>
            <Wishlist />
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
      {
        path: "order-confirmed/:id",
        element: (
          <AuthRoute>
            <OrderConfirmed />
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
      {
        path: "forgot-password",
        element: (
          <UnAuthRoute>
            <ForgotPassword />
          </UnAuthRoute>
        ),
      },
      {
        path: "reset-password",
        element: (
          <UnAuthRoute>
            <ResetPassword />
          </UnAuthRoute>
        ),
      },
    ],
  },

  /* ─── Layout 3: Admin Login (standalone, no sidebar) ─── */
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  /* ─── Layout 4: Admin Dashboard (Sidebar) ─── */
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "analytics", element: <AdminAnalytics /> },
      { path: "products", element: <AdminProducts /> },
      { path: "products/new", element: <AdminEditProduct /> },
      { path: "products/:id/edit", element: <AdminEditProduct /> },
      { path: "categories", element: <AdminCategories /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "customers", element: <AdminCustomers /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },
]);
