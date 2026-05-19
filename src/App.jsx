import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./client/contexts/AuthContext";
import CartContextProvider from "./client/contexts/CartContext";
import { Toaster } from "sonner";
import { router } from "./routes";

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

