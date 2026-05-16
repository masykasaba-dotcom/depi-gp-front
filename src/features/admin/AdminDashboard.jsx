import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
} from "lucide-react";

const statCards = [
  {
    label: "Total Revenue",
    value: "$0",
    icon: DollarSign,
    change: "+0%",
    color: "#10b981",
  },
  {
    label: "Total Orders",
    value: "0",
    icon: ShoppingCart,
    change: "+0%",
    color: "#6366f1",
  },
  {
    label: "Total Products",
    value: "0",
    icon: Package,
    change: "0 new",
    color: "#f59e0b",
  },
  {
    label: "Total Customers",
    value: "0",
    icon: Users,
    change: "+0%",
    color: "#ec4899",
  },
];

export default function AdminDashboard() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Dashboard</h1>
          <p className="admin-page__subtitle">
            Welcome back! Here's an overview of your store.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="admin-stats-grid">
        {statCards.map((card) => (
          <div key={card.label} className="admin-stat-card">
            <div className="admin-stat-card__header">
              <span className="admin-stat-card__label">{card.label}</span>
              <div
                className="admin-stat-card__icon"
                style={{ backgroundColor: `${card.color}15`, color: card.color }}
              >
                <card.icon size={18} />
              </div>
            </div>
            <div className="admin-stat-card__value">{card.value}</div>
            <div className="admin-stat-card__change">
              <TrendingUp size={14} />
              <span>{card.change}</span>
              <span className="admin-stat-card__period">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder sections */}
      <div className="admin-grid-2">
        <div className="admin-card">
          <h3 className="admin-card__title">Recent Orders</h3>
          <p className="admin-card__empty">No orders yet. Data will appear here once orders come in.</p>
        </div>
        <div className="admin-card">
          <h3 className="admin-card__title">Top Products</h3>
          <p className="admin-card__empty">No product data yet. Your top sellers will be listed here.</p>
        </div>
      </div>
    </div>
  );
}
