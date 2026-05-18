import { Outlet } from "react-router";
import ScrollToTop from "../components/ui/ScrollToTop";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-surface">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}
