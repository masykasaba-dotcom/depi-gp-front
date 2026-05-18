import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FolderTree,
  BarChart2,
} from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo-removebg-preview.png";

const navItems = [
  { to: "/admin",            icon: LayoutDashboard, label: "Dashboard",  end: true },
  { to: "/admin/analytics",  icon: BarChart2,       label: "Analytics" },
  { to: "/admin/products",   icon: Package,         label: "Products" },
  { to: "/admin/categories", icon: FolderTree,      label: "Categories" },
  { to: "/admin/orders",     icon: ShoppingCart,    label: "Orders" },
  { to: "/admin/customers",  icon: Users,           label: "Customers" },
  { to: "/admin/settings",   icon: Settings,        label: "Settings" },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("admin-token");
    navigate("/admin/login");
  }

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* ── Logo ── */}
      <div className="admin-sidebar__header">
        {!collapsed && (
          <div className="admin-sidebar__logo">
            <img
              src={logo}
              alt="DermaCare"
              style={{ height: 36, width: "auto", objectFit: "contain" }}
            />
            <small>Admin Console</small>
          </div>
        )}
        <button
          className="admin-sidebar__toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="admin-sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `admin-sidebar__link ${isActive ? "active" : ""}`
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={18} strokeWidth={1.8} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="admin-sidebar__footer">
        <NavLink
          to="/"
          className="admin-sidebar__link"
          title={collapsed ? "Back to Store" : undefined}
        >
          <LogOut size={18} strokeWidth={1.8} />
          {!collapsed && <span>Back to Store</span>}
        </NavLink>

        {!collapsed && (
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: 11,
              width: "100%", padding: "9px 12px", marginTop: 2,
              borderRadius: 10, border: "none", background: "transparent",
              color: "#ef4444", fontSize: "13.5px", fontWeight: 500,
              cursor: "pointer", transition: "background 0.18s",
              textAlign: "left",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <LogOut size={18} strokeWidth={1.8} />
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </aside>
  );
}
