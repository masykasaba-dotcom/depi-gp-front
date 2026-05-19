import { BarChart2, Users, Brain, TrendingUp } from "lucide-react";

const SKIN_TYPES = [
  { type: "Oily",        count: 142, pct: 38, color: "#6366f1" },
  { type: "Dry",         count: 88,  pct: 23, color: "#3b82f6" },
  { type: "Combination", count: 96,  pct: 26, color: "#10b981" },
  { type: "Sensitive",   count: 48,  pct: 13, color: "#f59e0b" },
];

const CONCERNS = [
  { concern: "Acne / Breakouts", count: 186, pct: 49 },
  { concern: "Hyperpigmentation", count: 144, pct: 38 },
  { concern: "Fine Lines & Aging", count: 132, pct: 35 },
  { concern: "Dehydration", count: 120, pct: 32 },
  { concern: "Large Pores", count: 98, pct: 26 },
  { concern: "Redness / Rosacea", count: 72, pct: 19 },
];

const TOP_RESULTS = [
  { product: "Hyaluronic Serum 2%", recommended: 89, converted: 62, rate: 70 },
  { product: "Niacinamide 10% Booster", recommended: 74, converted: 51, rate: 69 },
  { product: "AHA/BHA Exfoliant", recommended: 58, converted: 36, rate: 62 },
  { product: "Barrier Defense Cream", recommended: 45, converted: 28, rate: 62 },
];

export default function AdminQuizAnalytics() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Quiz Analytics</h1>
          <p className="admin-page__subtitle">Insights from the skin quiz — understanding your customers' needs.</p>
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Completions", value: "374", change: "+18%", icon: Brain, color: "#6366f1" },
          { label: "Completion Rate", value: "68%", change: "+5%", icon: TrendingUp, color: "#10b981" },
          { label: "Avg Score", value: "7.4/10", change: "+0.3", icon: BarChart2, color: "#3b82f6" },
          { label: "Unique Users", value: "312", change: "+22%", icon: Users, color: "#f59e0b" },
        ].map(c => (
          <div key={c.label} className="admin-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${c.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <c.icon size={18} color={c.color} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, background: "#d1fae5", color: "#065f46", padding: "2px 8px", borderRadius: 99 }}>{c.change}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#1e1e2d", marginBottom: 4 }}>{c.value}</div>
            <div style={{ fontSize: 12, color: "#71717a", fontWeight: 500 }}>{c.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Skin Types */}
        <div className="admin-card">
          <h3 className="admin-card__title">Skin Type Distribution</h3>
          {SKIN_TYPES.map(s => (
            <div key={s.type} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{s.type}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1e1e2d" }}>{s.pct}% <span style={{ color: "#a1a1aa", fontWeight: 400, fontSize: 11 }}>({s.count})</span></span>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: "#f0f0f5", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${s.pct}%`, background: s.color, borderRadius: 99, transition: "width 0.8s ease" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Concerns */}
        <div className="admin-card">
          <h3 className="admin-card__title">Top Skin Concerns</h3>
          {CONCERNS.map(c => (
            <div key={c.concern} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: "#374151" }}>{c.concern}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#1e1e2d" }}>{c.count}</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: "#f0f0f5", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${c.pct}%`, background: "linear-gradient(90deg, #6366f1, #818cf8)", borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top recommended products */}
      <div className="admin-card">
        <h3 className="admin-card__title">Quiz → Purchase Conversion</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8f9fc" }}>
              {["Product", "Recommended", "Purchased", "Conversion Rate"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TOP_RESULTS.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid #f0f0f5" }}>
                <td style={{ padding: "14px 16px", fontWeight: 600, color: "#1e1e2d" }}>{r.product}</td>
                <td style={{ padding: "14px 16px", color: "#71717a" }}>{r.recommended}</td>
                <td style={{ padding: "14px 16px", color: "#71717a" }}>{r.converted}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, height: 6, borderRadius: 99, background: "#f0f0f5", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${r.rate}%`, background: "#10b981", borderRadius: 99 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981", minWidth: 36 }}>{r.rate}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
