import { Outlet } from "react-router";
import AdminSidebar from "../features/admin/AdminSidebar";
import "../features/admin/admin.css";

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
