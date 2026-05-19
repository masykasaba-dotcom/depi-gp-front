import { Outlet } from "react-router";
import ScrollToTop from "../../shared/components/ScrollToTop";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-surface">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}
