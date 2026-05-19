import { Plus, Edit2, Trash2 } from "lucide-react";

const RULES = [
  { id: 1, name: "Standard Shipping (Domestic)", rate: 5.99, conditions: "Orders under $50" },
  { id: 2, name: "Free Standard Shipping", rate: 0, conditions: "Orders $50 and up" },
  { id: 3, name: "Express Delivery", rate: 14.99, conditions: "All orders (optional)" },
  { id: 4, name: "International Economy", rate: 24.99, conditions: "Outside Egypt" },
];

export default function AdminShippingRules() {
  return (
    <div className="admin-page" style={{ maxWidth: 900 }}>
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Shipping Rules</h1>
          <p className="admin-page__subtitle">Set up shipping zones, rates, and free shipping thresholds.</p>
        </div>
        <button style={btnSolid}><Plus size={14} /> Add Rule</button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8f9fc" }}>
              {["Name", "Rate", "Conditions", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RULES.map(r => (
              <tr key={r.id} style={{ borderTop: "1px solid #f0f0f5" }}>
                <td style={{ padding: "14px 16px", fontWeight: 600, color: "#1e1e2d" }}>{r.name}</td>
                <td style={{ padding: "14px 16px", fontWeight: 700, color: r.rate === 0 ? "#10b981" : "#1e1e2d" }}>
                  {r.rate === 0 ? "Free" : `$${r.rate}`}
                </td>
                <td style={{ padding: "14px 16px", color: "#71717a" }}>{r.conditions}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ ...btnOutline, padding: "6px 10px" }}><Edit2 size={13} /></button>
                    <button style={{ ...btnOutline, padding: "6px 10px", color: "#ef4444", borderColor: "#fca5a5" }}><Trash2 size={13} /></button>
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

const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
const btnOutline = { borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
