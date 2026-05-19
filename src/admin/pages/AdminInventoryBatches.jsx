import { Link } from "react-router";
import { Package, Plus, AlertTriangle, CheckCircle, Clock, ChevronRight } from "lucide-react";

const batches = [
  { id: "BTH-001", product: "Hyaluronic Serum 2%", sku: "HAS-30ML", manufactured: "2025-03-12", expiry: "2027-03-12", qty: 240, status: "active" },
  { id: "BTH-002", product: "Retinol Night Cream", sku: "RNC-50ML", manufactured: "2025-01-05", expiry: "2026-07-05", qty: 30, status: "low" },
  { id: "BTH-003", product: "Vitamin C Brightening Toner", sku: "VCT-150ML", manufactured: "2024-11-20", expiry: "2026-05-20", qty: 0, status: "expired" },
  { id: "BTH-004", product: "Barrier Defense Moisturizer", sku: "BDM-75ML", manufactured: "2025-04-01", expiry: "2027-04-01", qty: 180, status: "active" },
  { id: "BTH-005", product: "AHA/BHA Exfoliant", sku: "AHA-100ML", manufactured: "2025-02-18", expiry: "2027-02-18", qty: 12, status: "low" },
];

const STATUS = {
  active:  { label: "Active",  bg: "#d1fae5", color: "#065f46", Icon: CheckCircle },
  low:     { label: "Low Stock", bg: "#fef3c7", color: "#92400e", Icon: AlertTriangle },
  expired: { label: "Expired", bg: "#fee2e2", color: "#991b1b", Icon: Clock },
};

export default function AdminInventoryBatches() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Inventory / Batches</h1>
          <p className="admin-page__subtitle">Track product batches, expiry dates, and stock levels.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link to="/admin/products" style={btnOutline}>View Products</Link>
          <button style={btnSolid}><Plus size={14} /> New Batch</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Batches", value: "5", color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
          { label: "Active", value: "2", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
          { label: "Low Stock", value: "2", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
          { label: "Expired", value: "1", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
        ].map(s => (
          <div key={s.label} className="admin-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#71717a", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 className="admin-card__title" style={{ margin: 0 }}>Batch Records</h3>
          <input placeholder="Search batches..." style={searchStyle} />
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8f9fc" }}>
              {["Batch ID", "Product", "SKU", "Manufactured", "Expiry", "Qty", "Status", ""].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {batches.map(b => {
              const s = STATUS[b.status];
              return (
                <tr key={b.id} style={{ borderTop: "1px solid #f0f0f5" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: "#1e1e2d" }}>{b.id}</td>
                  <td style={{ padding: "14px 16px", color: "#374151" }}>{b.product}</td>
                  <td style={{ padding: "14px 16px", color: "#71717a", fontFamily: "monospace", fontSize: 12 }}>{b.sku}</td>
                  <td style={{ padding: "14px 16px", color: "#71717a" }}>{b.manufactured}</td>
                  <td style={{ padding: "14px 16px", color: b.status === "expired" ? "#ef4444" : "#71717a", fontWeight: b.status === "expired" ? 700 : 400 }}>{b.expiry}</td>
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: b.qty === 0 ? "#ef4444" : b.qty < 20 ? "#f59e0b" : "#1e1e2d" }}>{b.qty}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <s.Icon size={10} /> {s.label}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6366f1", display: "flex", alignItems: "center", gap: 2, fontSize: 12, fontWeight: 600 }}>
                      Details <ChevronRight size={12} />
                    </button>
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
const btnOutline = { padding: "8px 14px", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none" };
const searchStyle = { padding: "8px 12px", border: "1px solid #e4e4e7", borderRadius: 8, fontSize: 13, outline: "none", width: 220, background: "#f8f9fc" };
