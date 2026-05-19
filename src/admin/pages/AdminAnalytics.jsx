import { useState } from "react";
import { BarChart2, TrendingUp, ShoppingBag, Users, Activity } from "lucide-react";
import {
  useAdminRevenue, useAdminTopProducts,
  useAdminOrdersBreakdown, useAdminCustomerAnalytics, useAdminQuizAnalytics,
} from "../hooks/useAdminAPI";

const STATUS_COLORS_BAR = {
  pending:   "#f59e0b",
  paid:      "#6366f1",
  shipped:   "#0ea5e9",
  delivered: "#10b981",
  cancelled: "#ef4444",
};

export default function AdminAnalytics() {
  const [days, setDays] = useState(30);
  const { data: revenue, isLoading: revLoading } = useAdminRevenue(days);
  const { data: topProducts, isLoading: topLoading } = useAdminTopProducts();
  const { data: breakdown, isLoading: brkLoading } = useAdminOrdersBreakdown();
  const { data: customers } = useAdminCustomerAnalytics(days);
  const { data: quiz } = useAdminQuizAnalytics();

  const summary = revenue?.summary;
  const dailyData = revenue?.daily || [];

  // Simple bar-chart max
  const maxRevenue = dailyData.length ? Math.max(...dailyData.map(d => d.revenue), 1) : 1;

  const summaryCards = [
    { label: "Gross Revenue", value: summary ? `$${summary.total_revenue.toLocaleString()}` : "—", icon: TrendingUp, color: "#10b981", sub: `+vs last ${days}d` },
    { label: "Avg Order Value", value: summary ? `$${summary.avg_order_value}` : "—", icon: ShoppingBag, color: "#6366f1", sub: "per order" },
    { label: "Total Orders", value: summary?.total_orders ?? "—", icon: Activity, color: "#f59e0b", sub: `last ${days} days` },
    { label: "Total Customers", value: customers?.total_customers ?? "—", icon: Users, color: "#ec4899", sub: `${customers?.new_customers_last_n_days ?? 0} new` },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <p style={labelStyle}>Lab Report</p>
          <h1 className="admin-page__title">Performance Analytics</h1>
          <p className="admin-page__subtitle">Revenue, orders, and skin quiz insights.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[7, 30, 90].map(d => (
            <button key={d} onClick={() => setDays(d)} style={{
              padding: "7px 14px", borderRadius: 8, border: "1px solid #e4e4e7",
              background: days === d ? "#1e1e2d" : "#fff",
              color: days === d ? "#fff" : "#1e1e2d",
              fontWeight: 600, fontSize: 13, cursor: "pointer",
            }}>
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="admin-stats-grid">
        {summaryCards.map(card => (
          <div key={card.label} className="admin-stat-card">
            <div className="admin-stat-card__header">
              <span className="admin-stat-card__label">{card.label}</span>
              <div className="admin-stat-card__icon" style={{ backgroundColor: `${card.color}18`, color: card.color }}>
                <card.icon size={18} />
              </div>
            </div>
            <div className="admin-stat-card__value">
              {revLoading ? <span style={{ color: "#e4e4e7" }}>●●●</span> : card.value}
            </div>
            <div style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4 }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Revenue Bar Chart */}
      <div className="admin-card" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h3 className="admin-card__title" style={{ margin: "0 0 4px" }}>Revenue Trajectory</h3>
            <p style={{ fontSize: 13, color: "#a1a1aa", margin: 0 }}>Daily gross revenue over selected period.</p>
          </div>
          <div style={{ fontSize: 12, color: "#a1a1aa", display: "flex", gap: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 3, background: "#1e1e2d", display: "inline-block", borderRadius: 2 }} /> Revenue
            </span>
          </div>
        </div>

        {revLoading ? (
          <div style={{ height: 200, background: "#f9f9fb", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#a1a1aa", fontSize: 13 }}>
            Loading chart data...
          </div>
        ) : dailyData.length === 0 ? (
          <div style={{ height: 200, background: "#f9f9fb", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#a1a1aa", fontSize: 13 }}>
            No revenue data for this period.
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 180, overflowX: "auto", paddingBottom: 8 }}>
            {dailyData.map((d, i) => {
              const h = Math.max(4, (d.revenue / maxRevenue) * 160);
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: "0 0 auto" }} title={`${d.date}: $${d.revenue}`}>
                  <div style={{ width: 10, height: h, background: "linear-gradient(to top, #1e1e2d, #4f4f6f)", borderRadius: "3px 3px 0 0", transition: "height 0.3s" }} />
                  {i % Math.ceil(dailyData.length / 8) === 0 && (
                    <span style={{ fontSize: 9, color: "#a1a1aa", writingMode: "horizontal-tb", whiteSpace: "nowrap" }}>
                      {new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="admin-grid-2">
        {/* Orders Breakdown */}
        <div className="admin-card">
          <h3 className="admin-card__title">Orders by Status</h3>
          {brkLoading ? (
            <p style={{ color: "#a1a1aa", fontSize: 13 }}>Loading...</p>
          ) : breakdown?.breakdown?.length ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {breakdown.breakdown.map(b => (
                <div key={b.status}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, textTransform: "capitalize", color: "#1e1e2d" }}>{b.status}</span>
                    <span style={{ fontSize: 13, color: "#71717a" }}>{b.count} <span style={{ color: "#a1a1aa" }}>({b.percentage}%)</span></span>
                  </div>
                  <div style={{ height: 6, background: "#f4f4f5", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${b.percentage}%`, background: STATUS_COLORS_BAR[b.status] || "#94a3b8", borderRadius: 3, transition: "width 0.5s" }} />
                  </div>
                </div>
              ))}
              <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4 }}>Total: {breakdown.total} orders</p>
            </div>
          ) : (
            <p className="admin-card__empty">No order data.</p>
          )}
        </div>

        {/* Top Products */}
        <div className="admin-card">
          <h3 className="admin-card__title">Top Formulations by Sales</h3>
          {topLoading ? (
            <p style={{ color: "#a1a1aa", fontSize: 13 }}>Loading...</p>
          ) : topProducts?.length ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {topProducts.slice(0, 8).map((p, i) => (
                <div key={p.variant_id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#a1a1aa", width: 18, textAlign: "right" }}>{i + 1}</span>
                  {p.image && (
                    <img src={p.image} alt={p.product_name} style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 6 }} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1e1e2d", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.product_name}</p>
                    <p style={{ margin: 0, fontSize: 11, color: "#a1a1aa" }}>{p.size}</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1e1e2d", flexShrink: 0 }}>{p.total_sold} units</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="admin-card__empty">No sales data yet.</p>
          )}
        </div>

        {/* Quiz Analytics */}
        <div className="admin-card">
          <h3 className="admin-card__title">Skin Quiz Analytics</h3>
          {quiz ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1, background: "#f9f9fb", borderRadius: 10, padding: "16px", textAlign: "center" }}>
                  <p style={{ fontSize: 28, fontWeight: 800, color: "#1e1e2d", margin: 0 }}>{quiz.total_quiz_takers}</p>
                  <p style={{ fontSize: 11, color: "#a1a1aa", margin: "4px 0 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Quiz Takers</p>
                </div>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#a1a1aa", marginBottom: 8 }}>Skin Type Distribution</p>
                {quiz.skin_type_distribution?.map(s => (
                  <div key={s.skin_type} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #f4f4f5", fontSize: 13 }}>
                    <span style={{ fontWeight: 600, textTransform: "capitalize", color: "#1e1e2d" }}>{s.skin_type}</span>
                    <span style={{ color: "#71717a" }}>{s.count} users</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="admin-card__empty">No quiz data available.</p>
          )}
        </div>

        {/* Customer Stats */}
        <div className="admin-card">
          <h3 className="admin-card__title">Customer Insights</h3>
          {customers ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Total Customers", value: customers.total_customers },
                { label: `New (last ${days}d)`, value: customers.new_customers_last_n_days },
                { label: `Active (last ${days}d)`, value: customers.active_customers_last_n_days },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f4f4f5" }}>
                  <span style={{ fontSize: 14, color: "#52525b" }}>{s.label}</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "#1e1e2d" }}>{s.value?.toLocaleString() ?? "—"}</span>
                </div>
              ))}

              {quiz?.top_concerns?.length > 0 && (
                <>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#a1a1aa", marginBottom: 4, marginTop: 8 }}>Top Skin Concerns</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {quiz.top_concerns.slice(0, 8).map(c => (
                      <span key={c.concern} style={{ padding: "4px 10px", background: "#f4f4f5", borderRadius: 20, fontSize: 12, fontWeight: 600, color: "#52525b" }}>
                        {c.concern} <span style={{ color: "#a1a1aa" }}>({c.count})</span>
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <p className="admin-card__empty">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

const labelStyle = { fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 4 };
