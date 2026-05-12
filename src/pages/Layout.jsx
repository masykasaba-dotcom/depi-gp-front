import Navbar from "./../components/Navbar";
import { Outlet } from "react-router";
import Footer from "./../components/Footer";

export default function Layout() {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
