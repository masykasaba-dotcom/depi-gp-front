import { useState } from "react";
import { Zap, Clock, Plus, Edit2, Trash2 } from "lucide-react";

const SALES = [
  { id: 1, name: "Weekend Flash Sale",    discount: 25, products: ["Hyaluronic Serum", "Retinol Cream"], start: "2025-05-17 00:00", end: "2025-05-18 23:59", status: "ended",   originalRevenue: 2840 },
  { id: 2, name: "Summer Glow Event",     discount: 30, products: ["Vitamin C Toner", "SPF Moisturizer"], start: "2025-06-21 10:00", end: "2025-06-21 22:00", status: "upcoming", originalRevenue: 0 },
  { id: 3, name: "Niacinamide Spotlight", discount: 20, products: ["Niacinamide 10%", "Pore Tightening Serum"], start: "2025-05-19 12:00", end: "2025-05-19 20:00", status: "live", originalRevenue: 980 },
];

const STATUS = {
  live:     { bg: "#d1fae5", color: "#065f46", dot: "#10b981" },
  upcoming: { bg: "#dbeafe", color: "#1e40af", dot: "#3b82f6" },
  ended:    { bg: "#f4f4f5", color: "#71717a", dot: "#a1a1aa" },
};

export default function AdminFlashSales() {
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Flash Sales</h1>
          <p className="admin-page__subtitle">Schedule time-limited sales events with countdown timers.</p>
        </div>
        <button onClick={() => setShowNew(!showNew)} style={btnSolid}><Plus size={14} /> New Flash Sale</button>
      </div>

      {/* Live indicator */}
      {SALES.find(s => s.status === "live") && (
        <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.02))", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "14px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 0 4px rgba(16,185,129,0.2)", animation: "pulse 2s infinite" }} />
          <div>
            <span style={{ fontWeight: 700, color: "#065f46", fontSize: 14 }}>Live Now: </span>
            <span style={{ color: "#374151", fontSize: 14 }}>{SALES.find(s => s.status === "live").name}</span>
          </div>
          <span style={{ marginLeft: "auto", background: "#10b981", color: "#fff", padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 700 }}>🔴 LIVE</span>
        </div>
      )}

      {/* New Sale Form */}
      {showNew && (
        <div className="admin-card" style={{ marginBottom: 24, borderTop: "3px solid #f59e0b" }}>
          <h3 className="admin-card__title"><Zap size={14} color="#f59e0b" style={{ marginRight: 6 }} />Create Flash Sale</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            {[["Sale Name", "text", "e.g. Weekend Flash Sale"], ["Discount %", "number", "e.g. 20"]].map(([label, type, ph]) => (
              <div key={label}>
                <label style={labelStyle}>{label}</label>
                <input type={type} placeholder={ph} style={inputStyle} />
              </div>
            ))}
            <div>
              <label style={labelStyle}>Start Date & Time</label>
              <input type="datetime-local" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>End Date & Time</label>
              <input type="datetime-local" style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Products (select from catalog)</label>
              <input placeholder="Search and select products..." style={inputStyle} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button style={btnSolid}>Schedule Sale</button>
            <button onClick={() => setShowNew(false)} style={btnOutline}>Cancel</button>
          </div>
        </div>
      )}

      {/* Sales cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SALES.map(sale => {
          const s = STATUS[sale.status];
          return (
            <div key={sale.id} className="admin-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(245,158,11,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Zap size={24} color="#f59e0b" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: "#1e1e2d", marginBottom: 4 }}>{sale.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ background: s.bg, color: s.color, padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
                        {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                      </span>
                      <span style={{ fontSize: 12, color: "#a1a1aa" }}>
                        <Clock size={11} style={{ marginRight: 3 }} />{sale.start} – {sale.end}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "#f59e0b" }}>{sale.discount}%</div>
                    <div style={{ fontSize: 11, color: "#a1a1aa", fontWeight: 600 }}>DISCOUNT</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ ...btnOutline, padding: "7px 12px" }}><Edit2 size={13} /></button>
                    <button style={{ ...btnOutline, padding: "7px 12px", color: "#ef4444", borderColor: "#fca5a5" }}><Trash2 size={13} /></button>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #f0f0f5", display: "flex", gap: 8, flexWrap: "wrap" }}>
                {sale.products.map(p => (
                  <span key={p} style={{ background: "#f8f9fc", border: "1px solid #e4e4e7", color: "#374151", padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 500 }}>{p}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 12, fontWeight: 700, color: "#52525b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" };
const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #e4e4e7", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" };
const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
const btnOutline = { padding: "8px 14px", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 };
