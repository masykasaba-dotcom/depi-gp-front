import { useState } from "react";
import { Tag, Plus, Copy, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

const COUPONS = [
  { id: 1, code: "WELCOME15", type: "percent", value: 15, minOrder: 50,  uses: 142, maxUses: 500,  expiry: "2025-12-31", active: true },
  { id: 2, code: "FREESHIP",  type: "shipping",value: 0,  minOrder: 30,  uses: 89,  maxUses: 200,  expiry: "2025-09-30", active: true },
  { id: 3, code: "SAVE20",    type: "percent", value: 20, minOrder: 100, uses: 200, maxUses: 200,  expiry: "2025-06-15", active: false },
  { id: 4, code: "FLAT10",    type: "fixed",   value: 10, minOrder: 40,  uses: 34,  maxUses: 1000, expiry: "2025-08-01", active: true },
  { id: 5, code: "VIPEXCL",   type: "percent", value: 25, minOrder: 75,  uses: 12,  maxUses: 50,   expiry: "2025-07-01", active: true },
];

export default function AdminPromotions() {
  const [coupons, setCoupons] = useState(COUPONS);
  const [showNew, setShowNew] = useState(false);
  const [newCode, setNewCode] = useState({ code: "", type: "percent", value: "", minOrder: "", maxUses: "", expiry: "" });

  const toggle = (id) => setCoupons(cs => cs.map(c => c.id === id ? { ...c, active: !c.active } : c));

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Promotions & Coupons</h1>
          <p className="admin-page__subtitle">Create and manage discount codes and promotional offers.</p>
        </div>
        <button onClick={() => setShowNew(!showNew)} style={btnSolid}><Plus size={14} /> New Coupon</button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Active Coupons", value: coupons.filter(c => c.active).length, color: "#10b981" },
          { label: "Total Uses", value: coupons.reduce((a,c) => a + c.uses, 0), color: "#6366f1" },
          { label: "Expired", value: coupons.filter(c => !c.active).length, color: "#f59e0b" },
          { label: "Avg Discount", value: "17%", color: "#3b82f6" },
        ].map(s => (
          <div key={s.label} className="admin-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#71717a", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* New Coupon Form */}
      {showNew && (
        <div className="admin-card" style={{ marginBottom: 20, borderTop: "3px solid #6366f1" }}>
          <h3 className="admin-card__title">Create New Coupon</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[["Code", "code", "text", "SUMMER20"], ["Value", "value", "number", "20"], ["Min Order ($)", "minOrder", "number", "50"], ["Max Uses", "maxUses", "number", "100"], ["Expiry Date", "expiry", "date", ""]].map(([label, key, type, ph]) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input type={type} placeholder={ph} value={newCode[key]} onChange={e => setNewCode(n => ({ ...n, [key]: e.target.value }))} style={inputStyle} />
              </div>
            ))}
            <div>
              <label style={labelStyle}>Type</label>
              <select value={newCode.type} onChange={e => setNewCode(n => ({ ...n, type: e.target.value }))} style={inputStyle}>
                <option value="percent">Percentage</option>
                <option value="fixed">Fixed Amount</option>
                <option value="shipping">Free Shipping</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button style={btnSolid}>Create Coupon</button>
            <button onClick={() => setShowNew(false)} style={btnOutline}>Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8f9fc" }}>
              {["Code", "Type", "Value", "Min Order", "Uses", "Expiry", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.id} style={{ borderTop: "1px solid #f0f0f5", opacity: c.active ? 1 : 0.55 }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Tag size={13} color="#6366f1" />
                    <span style={{ fontWeight: 800, color: "#1e1e2d", fontFamily: "monospace", fontSize: 13 }}>{c.code}</span>
                    <button onClick={() => navigator.clipboard.writeText(c.code)} style={{ background: "none", border: "none", cursor: "pointer", color: "#a1a1aa", padding: 0 }}><Copy size={11} /></button>
                  </div>
                </td>
                <td style={{ padding: "14px 16px", color: "#71717a", textTransform: "capitalize" }}>{c.type}</td>
                <td style={{ padding: "14px 16px", fontWeight: 700, color: "#1e1e2d" }}>
                  {c.type === "percent" ? `${c.value}%` : c.type === "fixed" ? `$${c.value}` : "Free"}
                </td>
                <td style={{ padding: "14px 16px", color: "#71717a" }}>${c.minOrder}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 12 }}>
                    <span style={{ fontWeight: 700, color: "#1e1e2d" }}>{c.uses}</span>
                    <span style={{ color: "#a1a1aa" }}>/{c.maxUses}</span>
                  </div>
                  <div style={{ height: 3, background: "#f0f0f5", borderRadius: 99, marginTop: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min((c.uses / c.maxUses) * 100, 100)}%`, background: c.uses >= c.maxUses ? "#ef4444" : "#6366f1", borderRadius: 99 }} />
                  </div>
                </td>
                <td style={{ padding: "14px 16px", color: "#71717a", fontSize: 12 }}>{c.expiry}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ background: c.active ? "#d1fae5" : "#f4f4f5", color: c.active ? "#065f46" : "#71717a", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>
                    {c.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button onClick={() => toggle(c.id)} style={{ background: "none", border: "none", cursor: "pointer", color: c.active ? "#6366f1" : "#a1a1aa" }}>
                      {c.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                    </button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Trash2 size={14} /></button>
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

const labelStyle = { display: "block", fontSize: 12, fontWeight: 700, color: "#52525b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" };
const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #e4e4e7", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" };
const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
const btnOutline = { padding: "8px 14px", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 };
