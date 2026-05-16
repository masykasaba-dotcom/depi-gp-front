import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
import { Toaster } from "sonner";
import { router } from "./router";

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

