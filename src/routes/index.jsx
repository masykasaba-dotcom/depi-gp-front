import { createBrowserRouter } from "react-router";
import { clientRoutes } from "./client.routes";
import { adminRoutes } from "./admin.routes";

export const router = createBrowserRouter([
  ...clientRoutes,
  ...adminRoutes,
]);
