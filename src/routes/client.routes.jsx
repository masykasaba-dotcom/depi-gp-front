import MainLayout from "../client/layouts/MainLayout";
import AuthLayout from "../client/layouts/AuthLayout";
import Home from "../client/pages/Home";
import NotFoundPage from "../client/pages/NotFoundPage";
import SignIn from "../client/pages/SignIn";
import ProductDetials from "../client/pages/ProductDetials";
import SignUp from "../client/pages/SignUp";
import Cart from "../client/pages/Cart";
import Addresses from "../client/pages/Addresses";
import Profile from "../client/pages/Profile";
import Orders from "../client/pages/Orders";
import OrderDetials from "../client/pages/OrderDetials";
import OrderConfirmed from "../client/pages/OrderConfirmed";
import ProductsPage from "../client/pages/ProductsPage";
import CategoriesPage from "../client/pages/CategoriesPage";
import PaymentMethods from "../client/pages/PaymentMethods";
import Checkout from "../client/pages/Checkout";
import AuthRoute from "../client/components/AuthRoute";
import UnAuthRoute from "../client/components/UnAuthRoute";
import TrackingOrder from "../client/pages/TrackingOrder";
import Survey from "../client/pages/Survey";
import UpdateSurvey from "../client/pages/UpdateSurvey";
import ForgotPassword from "../client/pages/ForgotPassword";
import ResetPassword from "../client/pages/ResetPassword";

import IngredientsGuide from "../client/pages/IngredientsGuide";
import Wishlist from "../client/pages/Wishlist";
import SurveyResult from "../client/pages/SurveyResult";
import ContactSupport from "../client/pages/ContactSupport";
import FAQs from "../client/pages/FAQs";
import Blog from "../client/pages/Blog";
import BlogPost from "../client/pages/BlogPost";
import CMSPage from "../client/pages/CMSPage";

export const clientRoutes = [
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
];
