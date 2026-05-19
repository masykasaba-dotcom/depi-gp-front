import { Outlet } from "react-router";
import AdminSidebar from "../features/AdminSidebar";
import "../features/admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-root">
      <AdminSidebar />
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}
