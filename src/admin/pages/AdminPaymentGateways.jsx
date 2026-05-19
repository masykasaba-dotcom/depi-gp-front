import { CreditCard, Edit2, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

const GATEWAYS = [
  { id: "stripe", name: "Stripe", description: "Credit/Debit Cards, Apple Pay, Google Pay", active: true },
  { id: "paypal", name: "PayPal", description: "PayPal accounts and cards", active: true },
  { id: "cod",    name: "Cash on Delivery", description: "Pay when the package arrives", active: false },
];

export default function AdminPaymentGateways() {
  const [gateways, setGateways] = useState(GATEWAYS);

  const toggle = (id) => setGateways(gs => gs.map(g => g.id === id ? { ...g, active: !g.active } : g));

  return (
    <div className="admin-page" style={{ maxWidth: 800 }}>
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Payment Gateways</h1>
          <p className="admin-page__subtitle">Configure how customers can pay for their orders.</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {gateways.map(g => (
          <div key={g.id} className="admin-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", opacity: g.active ? 1 : 0.6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f0f0f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CreditCard size={24} color="#6366f1" />
              </div>
              <div>
                <h3 style={{ margin: "0 0 4px", fontSize: 16, color: "#1e1e2d" }}>{g.name}</h3>
                <p style={{ margin: 0, fontSize: 13, color: "#71717a" }}>{g.description}</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: g.active ? "#10b981" : "#a1a1aa" }}>{g.active ? "Enabled" : "Disabled"}</span>
              <button onClick={() => toggle(g.id)} style={{ background: "none", border: "none", cursor: "pointer", color: g.active ? "#6366f1" : "#a1a1aa", padding: 0 }}>
                {g.active ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
              </button>
              <button style={{ ...btnOutline, padding: "6px 10px" }}><Edit2 size={14} /> Configure</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const btnOutline = { borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
