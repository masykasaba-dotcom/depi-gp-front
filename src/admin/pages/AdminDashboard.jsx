import { Link } from "react-router";
import { useAdminDashboard, useAdminTopProducts } from "../hooks/useAdminAPI";

/* ── Design tokens matching the project palette ── */
const INDIGO     = "#6366f1";
const INDIGO_L   = "rgba(99,102,241,0.12)";
const INDIGO_MID = "#818cf8";
const NAVY       = "#1e1e2d";
const SURFACE    = "#ffffff";
const BG         = "#f8f9fc";
const BORDER     = "#ececf4";
const TEXT_1     = "#1e1e2d";
const TEXT_2     = "#71717a";
const TEXT_3     = "#a1a1aa";

const STATUS_STYLES = {
  pending:    { bg: "#FEF3C7", text: "#92400E" },
  paid:       { bg: "#DBEAFE", text: "#1E40AF" },
  processing: { bg: "rgba(99,102,241,0.12)", text: "#4338ca" },
  shipped:    { bg: "#D1FAE5", text: "#065F46" },
  delivered:  { bg: "#D1FAE5", text: "#065F46" },
  cancelled:  { bg: "#FEE2E2", text: "#991B1B" },
};

/* ── Mini sparkline bar chart ── */
function MiniBar({ positive = true }) {
  const bars = [5, 7, 4, 8, 6, 9, 5, 10, 7, 11, 8, 12];
  const max  = Math.max(...bars);
  const active = positive ? INDIGO : "#ef4444";
  const idle   = positive ? INDIGO_L : "rgba(239,68,68,0.18)";
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 34, marginTop: 12 }}>
      {bars.map((h, i) => (
        <div key={i} style={{
          flex: 1,
          height: `${(h / max) * 100}%`,
          borderRadius: 3,
          background: i === bars.length - 1 ? active : idle,
          transition: "height 0.4s ease",
        }} />
      ))}
    </div>
  );
}

/* ── Skeleton loader ── */
function Skeleton({ w = "100%", h = 14 }) {
  return (
    <div style={{ width: w, height: h, borderRadius: 6, background: "#ececf4", animation: "pulse 1.5s ease-in-out infinite" }} />
  );
}

/* ── SVG Donut ── */
function Donut({ pct, color, label, size = 76 }) {
  const r    = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg width={size} height={size} style={{ overflow: "visible" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={BORDER} strokeWidth={9} />
        <circle
          cx={size/2} cy={size/2} r={r}
          fill="none" stroke={color} strokeWidth={9}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ / 4}
          strokeLinecap="round"
        />
        <text x="50%" y="50%" textAnchor="middle" dy="0.38em"
          fontSize={13} fontWeight={700} fill={TEXT_1}>{pct}%</text>
      </svg>
      <span style={{ fontSize: 11, color: TEXT_2, textAlign: "center", fontWeight: 500 }}>{label}</span>
    </div>
  );
}

/* ── Progress bar row ── */
function ProgressRow({ label, pct }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 13, color: TEXT_2, fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 13, color: TEXT_1, fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: BORDER, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`, borderRadius: 99,
          background: `linear-gradient(90deg, ${INDIGO}, ${INDIGO_MID})`,
          transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  );
}

/* ── Badge chip ── */
function Badge({ change, positive }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700,
      padding: "2px 8px", borderRadius: 99,
      background: positive ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
      color: positive ? "#059669" : "#ef4444",
    }}>
      {change}
    </span>
  );
}

export default function AdminDashboard() {
  const { data, isLoading } = useAdminDashboard();
  const { data: topProducts  } = useAdminTopProducts();

  const avgOrder = data && data.totalOrders > 0
    ? (Number(data.totalRevenue) / data.totalOrders).toFixed(2)
    : null;

  const topP   = Array.isArray(topProducts) ? topProducts.slice(0, 3) : [];
  const maxSold = topP.reduce((m, p) => Math.max(m, Number(p.total_sold)), 1);
  const fmPct   = topP.map(p => Math.round((Number(p.total_sold) / maxSold) * 100));

  const statCards = [
    {
      label: "Total Revenue",
      value: data ? `$${Number(data.totalRevenue).toLocaleString("en-US", { minimumFractionDigits: 2 })}` : null,
      change: "+12.5%", positive: true,
      icon: RevIcon,
    },
    {
      label: "Total Orders",
      value: data ? data.totalOrders.toLocaleString() : null,
      change: "+8.2%", positive: true,
      icon: OrderIcon,
    },
    {
      label: "Avg Order Value",
      value: avgOrder ? `$${avgOrder}` : null,
      change: "-2.1%", positive: false,
      icon: AvgIcon,
    },
    {
      label: "Low Stock Alerts",
      value: data ? String(data.lowStockAlerts) : null,
      change: "+15.4%", positive: true,
      icon: StockIcon,
    },
  ];

  return (
    <div style={{ maxWidth: 1100, fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: TEXT_3, marginBottom: 4, margin: "0 0 4px" }}>
            Admin Console
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: TEXT_1, margin: "0 0 4px", letterSpacing: "-0.4px" }}>
            Performance Overview
          </h1>
          <p style={{ fontSize: 13, color: TEXT_2, margin: 0 }}>
            Real-time clinical and commercial metrics for DermaCare.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
          <button style={btnGhost}>Last 7 Days ▾</button>
          <button style={btnOutline}>Export Report</button>
          <Link to="/admin/products/new" style={btnSolid}>+ New Product</Link>
        </div>
      </div>

      {/* ── 4 Stat Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {statCards.map((c) => (
          <div key={c.label} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: TEXT_2, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {c.label}
              </span>
              <span style={{ width: 36, height: 36, borderRadius: 10, background: INDIGO_L, color: INDIGO, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <c.icon />
              </span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: TEXT_1, margin: "10px 0 6px", letterSpacing: "-0.5px" }}>
              {isLoading ? <Skeleton h={28} w="65%" /> : (c.value ?? "—")}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Badge change={c.change} positive={c.positive} />
              <span style={{ fontSize: 11, color: TEXT_3 }}>vs last month</span>
            </div>
            <MiniBar positive={c.positive} />
          </div>
        ))}
      </div>

      {/* ── Middle row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 268px", gap: 16, marginBottom: 24 }}>

        {/* Clinical Insights */}
        <div>
          <SectionTitle>Clinical Insights</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ ...card, background: INDIGO_L, border: `1px solid rgba(99,102,241,0.2)` }}>
              <Label>Top Ingredient Search</Label>
              <p style={{ fontSize: 20, fontWeight: 800, color: INDIGO, margin: "6px 0 10px", letterSpacing: "-0.3px" }}>
                Niacinamide 10%
              </p>
              <p style={{ fontSize: 12, color: "#4338ca", margin: 0, lineHeight: 1.65 }}>
                Searches up 45% in last 7 days. Correlates with recent blog publication.
              </p>
            </div>
            <div style={card}>
              <Label>Routine Completion Rate</Label>
              <p style={{ fontSize: 34, fontWeight: 800, color: INDIGO, margin: "6px 0 8px", letterSpacing: "-1px" }}>
                68.2%
              </p>
              <p style={{ fontSize: 12, color: TEXT_2, margin: 0, lineHeight: 1.65 }}>
                Of users logging the 'Evening Repair' protocol finish all 3 steps.
              </p>
            </div>
          </div>
        </div>

        {/* Formulation Performance */}
        <div>
          <SectionTitle>Formulation Performance</SectionTitle>
          <div style={card}>
            {isLoading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[1,2,3].map(i => <Skeleton key={i} h={12} />)}
              </div>
            ) : topP.length ? (
              topP.map((p, i) => (
                <ProgressRow key={p.variant_id} label={p.product_name} pct={fmPct[i] || 0} />
              ))
            ) : (
              <>
                <ProgressRow label="Cellular Renewal Serum" pct={45} />
                <ProgressRow label="Barrier Defense Cream"  pct={32} />
                <ProgressRow label="Clarifying Exfoliant"   pct={23} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 268px", gap: 16 }}>

        {/* Recent Orders */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: TEXT_1, margin: 0 }}>Recent Orders</h3>
            <Link to="/admin/orders" style={{ fontSize: 13, color: INDIGO, fontWeight: 600, textDecoration: "none" }}>
              View All →
            </Link>
          </div>

          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[1,2,3,4].map(i => <Skeleton key={i} />)}
            </div>
          ) : data?.recent5Orders?.length ? (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                  {["Order ID", "Customer", "Date", "Amount", "Status"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "6px 10px", color: TEXT_3, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.recent5Orders.map((order) => {
                  const st = STATUS_STYLES[order.status] || { bg: "#f4f4f5", text: TEXT_2 };
                  return (
                    <tr key={order.order_id} style={{ borderBottom: `1px solid ${BG}` }}>
                      <td style={{ padding: "11px 10px", fontWeight: 700, color: TEXT_1 }}>
                        #{order.order_ref || order.order_id}
                      </td>
                      <td style={{ padding: "11px 10px", color: TEXT_2 }}>
                        {order.customer?.first_name} {order.customer?.last_name}
                      </td>
                      <td style={{ padding: "11px 10px", color: TEXT_3, fontSize: 12 }}>
                        {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })},{" "}
                        {new Date(order.created_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td style={{ padding: "11px 10px", fontWeight: 700, color: TEXT_1 }}>
                        ${Number(order.total).toFixed(2)}
                      </td>
                      <td style={{ padding: "11px 10px" }}>
                        <span style={{
                          background: st.bg, color: st.text,
                          padding: "3px 12px", borderRadius: 99,
                          fontSize: 11, fontWeight: 700, textTransform: "capitalize",
                        }}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", color: TEXT_3, padding: "32px 0", fontSize: 14 }}>
              No orders yet.
            </p>
          )}
        </div>

        {/* Lab Stock Health */}
        <div>
          <SectionTitle>Laboratory Stock Health</SectionTitle>
          <div style={{ ...card, display: "flex", justifyContent: "space-around", alignItems: "center", padding: "28px 20px" }}>
            <Donut
              pct={data ? Math.max(0, 100 - Math.min(99, Math.round((data.lowStockAlerts / Math.max(data.totalOrders, 1)) * 100))) : 85}
              color={INDIGO}
              label="In Stock"
            />
            <Donut
              pct={data ? Math.min(99, Math.round((data.lowStockAlerts / Math.max(data.totalOrders, 1)) * 100)) : 12}
              color="#ef4444"
              label="Low Stock"
            />
          </div>
        </div>
      </div>

    </div>
  );
}

/* ── Helper components ── */
function SectionTitle({ children }) {
  return (
    <h2 style={{ fontSize: 14, fontWeight: 700, color: TEXT_1, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
      {children}
    </h2>
  );
}

function Label({ children }) {
  return (
    <p style={{ fontSize: 10, fontWeight: 700, color: TEXT_2, margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
      {children}
    </p>
  );
}

/* ── SVG icons ── */
function RevIcon()   { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>; }
function OrderIcon() { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>; }
function AvgIcon()   { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2"/></svg>; }
function StockIcon() { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>; }

/* ── Shared style objects ── */
const card = {
  background: SURFACE,
  border: `1px solid ${BORDER}`,
  borderRadius: 12,
  padding: "20px 22px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

const btnGhost = {
  padding: "8px 14px", fontSize: 12, fontWeight: 600,
  border: `1px solid ${BORDER}`, borderRadius: 8,
  background: SURFACE, color: TEXT_2, cursor: "pointer",
};
const btnOutline = {
  padding: "8px 14px", fontSize: 12, fontWeight: 600,
  border: `1px solid ${BORDER}`, borderRadius: 8,
  background: SURFACE, color: TEXT_1, cursor: "pointer",
};
const btnSolid = {
  padding: "8px 18px", fontSize: 12, fontWeight: 600,
  borderRadius: 8, border: "none",
  background: NAVY, color: "#fff",
  textDecoration: "none", cursor: "pointer",
  display: "inline-flex", alignItems: "center",
};
