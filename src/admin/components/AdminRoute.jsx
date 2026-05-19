import { Navigate } from "react-router";

/**
 * Protects admin routes.
 * If no "admin-token" in localStorage → redirect to /admin/login.
 */
export default function AdminRoute({ children }) {
  const token = localStorage.getItem("admin-token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
