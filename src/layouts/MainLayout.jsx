import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
