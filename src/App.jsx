import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import SignIn from "./pages/SignIn";
import ProductDetials from "./pages/ProductDetials";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Addresses from "./pages/Addresses";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetials from "./pages/OrderDetials";
import ProductsPage from "./pages/ProductsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthRoute from "./components/AuthRoute";
import UnAuthRoute from "./components/UnAuthRoute";
import AuthContextProvider from "./store/AuthContext";
import CartContextProvider from "./store/CartContext";
import { Toaster } from "sonner";
import TrackingOrder from "./pages/TrackingOrder";
import Survey from "./pages/Survey";
import UpdateSurvey from "./pages/UpdateSurvey";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        path: 'profile/survey',
        element : (
          <AuthRoute>
            <Survey/>
          </AuthRoute>
        )
      },
      {
        path: 'profile/updateSurvey',
        element : (
          <AuthRoute>
            <UpdateSurvey/>
          </AuthRoute>
        )
      },
      {
        path: "orders",
        element: (
          <AuthRoute>
            <Orders />{" "}
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
]);

const queryClient = new QueryClient();
export default function App() {
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </CartContextProvider>
      </AuthContextProvider>
      <Toaster />
    </>
  );
}
