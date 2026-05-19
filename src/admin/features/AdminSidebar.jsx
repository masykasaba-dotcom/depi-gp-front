import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  BarChart2,
  Package,
  Layers,
  FlaskConical,
  FolderTree,
  ShoppingCart,
  RotateCcw,
  Users,
  Brain,
  Award,
  Tag,
  Zap,
  Image,
  FileText,
  Settings,
  Globe,
  CreditCard,
  Truck,
  Shield,
  Activity,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo-removebg-preview.png";

const navGroups = [
  {
    label: "Overview",
    items: [
      { to: "/admin",            icon: LayoutDashboard, label: "Dashboard",  end: true },
      { to: "/admin/analytics",  icon: BarChart2,       label: "Analytics" },
    ]
  },
  {
    label: "Catalog",
    items: [
      { to: "/admin/products",   icon: Package,         label: "Products" },
      { to: "/admin/inventory",  icon: Layers,          label: "Inventory / Batches" },
      { to: "/admin/ingredients",icon: FlaskConical,    label: "Ingredients DB" },
      { to: "/admin/categories", icon: FolderTree,      label: "Categories" },
    ]
  },
  {
    label: "Sales",
    items: [
      { to: "/admin/orders",     icon: ShoppingCart,    label: "Orders" },
      { to: "/admin/returns",    icon: RotateCcw,       label: "Returns / Refunds" },
    ]
  },
  {
    label: "Marketing",
    items: [
      { to: "/admin/customers",  icon: Users,           label: "Customers" },
      { to: "/admin/quiz-analytics",icon: Brain,        label: "Quiz Analytics" },
      { to: "/admin/loyalty",    icon: Award,           label: "Loyalty Program" },
      { to: "/admin/promotions", icon: Tag,             label: "Promotions" },
      { to: "/admin/flash-sales",icon: Zap,             label: "Flash Sales" },
      { to: "/admin/cms-banners",icon: Image,           label: "CMS / Banners" },
      { to: "/admin/blog-manager",icon: FileText,       label: "Blog Manager" },
    ]
  },
  {
    label: "Settings",
    items: [
      { to: "/admin/settings",   icon: Settings,        label: "Store Settings" },
      { to: "/admin/seo",        icon: Globe,           label: "SEO Settings" },
      { to: "/admin/payment",    icon: CreditCard,      label: "Payment Gateways" },
      { to: "/admin/shipping",   icon: Truck,           label: "Shipping Rules" },
      { to: "/admin/users",      icon: Shield,          label: "Users & Roles" },
      { to: "/admin/audit",      icon: Activity,        label: "Audit Log" },
    ]
  }
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
        {navGroups.map((group, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            {!collapsed && <div style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "12px 12px 6px" }}>{group.label}</div>}
            {collapsed && i > 0 && <div style={{ height: 1, background: "#f0f4f8", margin: "8px 12px" }} />}
            {group.items.map((item) => (
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
          </div>
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
