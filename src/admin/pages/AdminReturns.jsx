import { useState } from "react";
import { Link } from "react-router";
import { RotateCcw, CheckCircle, Clock, XCircle, Plus } from "lucide-react";

const RETURNS = [
  { id: "RET-001", order: "ORD-1028", customer: "Sara Ali", product: "Retinol Night Cream", reason: "Skin irritation", amount: 59.99, status: "pending", date: "2025-05-10" },
  { id: "RET-002", order: "ORD-1015", customer: "Omar Karim", product: "Hyaluronic Serum", reason: "Wrong item shipped", amount: 44.99, status: "approved", date: "2025-05-08" },
  { id: "RET-003", order: "ORD-997",  customer: "Nour Ibrahim", product: "Vitamin C Toner", reason: "Product expired", amount: 34.99, status: "refunded", date: "2025-05-05" },
  { id: "RET-004", order: "ORD-982",  customer: "Layla Hassan", product: "AHA/BHA Exfoliant", reason: "Not as described", amount: 29.99, status: "rejected", date: "2025-05-02" },
];

const STATUS = {
  pending:  { label: "Pending",  bg: "#fef3c7", color: "#92400e", Icon: Clock },
  approved: { label: "Approved", bg: "#dbeafe", color: "#1e40af", Icon: CheckCircle },
  refunded: { label: "Refunded", bg: "#d1fae5", color: "#065f46", Icon: CheckCircle },
  rejected: { label: "Rejected", bg: "#fee2e2", color: "#991b1b", Icon: XCircle },
};

export default function AdminReturns() {
  const [filter, setFilter] = useState("all");

  const filtered = RETURNS.filter(r => filter === "all" || r.status === filter);

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Returns & Refunds</h1>
          <p className="admin-page__subtitle">Manage customer return requests and process refunds.</p>
        </div>
        <button style={btnSolid}><Plus size={14} /> New Return</button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Returns", value: RETURNS.length, color: "#6366f1" },
          { label: "Pending", value: RETURNS.filter(r => r.status === "pending").length, color: "#f59e0b" },
          { label: "Approved", value: RETURNS.filter(r => r.status === "approved").length, color: "#3b82f6" },
          { label: "Refunded", value: RETURNS.filter(r => r.status === "refunded").length, color: "#10b981" },
        ].map(s => (
          <div key={s.label} className="admin-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#71717a", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {["all", "pending", "approved", "refunded", "rejected"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "7px 14px", borderRadius: 20, border: "1px solid #e4e4e7", fontSize: 12, fontWeight: 600, cursor: "pointer", background: filter === f ? "#1e1e2d" : "#fff", color: filter === f ? "#fff" : "#71717a", textTransform: "capitalize" }}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8f9fc" }}>
              {["Return ID", "Order", "Customer", "Product", "Reason", "Amount", "Date", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => {
              const s = STATUS[r.status];
              return (
                <tr key={r.id} style={{ borderTop: "1px solid #f0f0f5" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: "#1e1e2d" }}>{r.id}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <Link to={`/admin/orders/${r.order}`} style={{ color: "#6366f1", textDecoration: "none", fontWeight: 600 }}>{r.order}</Link>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#374151" }}>{r.customer}</td>
                  <td style={{ padding: "14px 16px", color: "#374151" }}>{r.product}</td>
                  <td style={{ padding: "14px 16px", color: "#71717a", fontSize: 12 }}>{r.reason}</td>
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: "#1e1e2d" }}>${r.amount.toFixed(2)}</td>
                  <td style={{ padding: "14px 16px", color: "#71717a", fontSize: 12 }}>{r.date}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <s.Icon size={10} /> {s.label}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    {r.status === "pending" && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button style={{ padding: "4px 10px", borderRadius: 6, border: "none", background: "#d1fae5", color: "#065f46", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Approve</button>
                        <button style={{ padding: "4px 10px", borderRadius: 6, border: "none", background: "#fee2e2", color: "#991b1b", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Reject</button>
                      </div>
                    )}
                    {r.status === "approved" && (
                      <button style={{ padding: "4px 10px", borderRadius: 6, border: "none", background: "#dbeafe", color: "#1e40af", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                        <RotateCcw size={10} style={{ marginRight: 3 }} />Refund
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
