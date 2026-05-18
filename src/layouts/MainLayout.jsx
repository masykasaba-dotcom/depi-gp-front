import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";

export default function MainLayout() {
  return (
    <main>
      <ScrollToTop />
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
