import { useState } from "react";
import { Award, Gift, Users, Star, Plus, Edit2 } from "lucide-react";

const TIERS = [
  { name: "Bronze", min: 0,    max: 499,  color: "#cd7f32", bg: "#fef3c7", perks: ["5% points on purchases", "Birthday discount 10%"] },
  { name: "Silver", min: 500,  max: 1499, color: "#94a3b8", bg: "#f1f5f9", perks: ["7% points on purchases", "Birthday discount 15%", "Free standard shipping"] },
  { name: "Gold",   min: 1500, max: 4999, color: "#f59e0b", bg: "#fffbeb", perks: ["10% points on purchases", "Birthday discount 20%", "Free express shipping", "Early sale access"] },
  { name: "Platinum", min: 5000, max: null, color: "#6366f1", bg: "rgba(99,102,241,0.08)", perks: ["15% points on purchases", "Birthday discount 25%", "Free express shipping", "VIP events access", "Personal skincare advisor"] },
];

const MEMBERS = [
  { name: "Sara Ali",      tier: "Platinum", points: 5820, spend: 618.82 },
  { name: "Layla Hassan",  tier: "Gold",     points: 820,  spend: 412.40 },
  { name: "Youssef Adel", tier: "Silver",    points: 510,  spend: 229.95 },
  { name: "Omar Karim",   tier: "Bronze",    points: 134,  spend: 134.97 },
];

const TIER_COLOR = { Bronze: "#cd7f32", Silver: "#94a3b8", Gold: "#f59e0b", Platinum: "#6366f1" };

export default function AdminLoyaltyProgram() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Loyalty Program</h1>
          <p className="admin-page__subtitle">Manage tiers, points, and member rewards.</p>
        </div>
        <button style={btnSolid}><Plus size={14} /> Add Reward</button>
      </div>

      {/* KPI */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Members", value: "374", icon: Users, color: "#6366f1" },
          { label: "Points Issued", value: "48,200", icon: Star, color: "#f59e0b" },
          { label: "Points Redeemed", value: "12,400", icon: Gift, color: "#10b981" },
          { label: "VIP Members", value: "23", icon: Award, color: "#8b5cf6" },
        ].map(c => (
          <div key={c.label} className="admin-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${c.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <c.icon size={18} color={c.color} />
              </div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#1e1e2d" }}>{c.value}</div>
            <div style={{ fontSize: 12, color: "#71717a", marginTop: 4, fontWeight: 500 }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {["overview", "tiers", "members"].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e4e4e7", fontSize: 13, fontWeight: 600, cursor: "pointer", background: activeTab === t ? "#1e1e2d" : "#fff", color: activeTab === t ? "#fff" : "#71717a", textTransform: "capitalize" }}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === "tiers" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
          {TIERS.map(tier => (
            <div key={tier.name} className="admin-card" style={{ borderTop: `3px solid ${tier.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Award size={20} color={tier.color} />
                  <span style={{ fontWeight: 800, fontSize: 16, color: tier.color }}>{tier.name}</span>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#a1a1aa" }}><Edit2 size={14} /></button>
              </div>
              <div style={{ fontSize: 12, color: "#71717a", marginBottom: 12 }}>
                {tier.min.toLocaleString()} – {tier.max ? tier.max.toLocaleString() : "∞"} points
              </div>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {tier.perks.map(p => (
                  <li key={p} style={{ fontSize: 12, color: "#374151", marginBottom: 6, lineHeight: 1.5 }}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === "members" && (
        <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8f9fc" }}>
                {["Customer", "Tier", "Points", "Total Spend"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map((m, i) => (
                <tr key={i} style={{ borderTop: "1px solid #f0f0f5" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600, color: "#1e1e2d" }}>{m.name}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ color: TIER_COLOR[m.tier], fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                      <Award size={12} /> {m.tier}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: "#6366f1" }}>{m.points.toLocaleString()}</td>
                  <td style={{ padding: "14px 16px", color: "#374151" }}>${m.spend.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="admin-card">
            <h3 className="admin-card__title">Tier Distribution</h3>
            {[{ tier: "Bronze", count: 180, pct: 48 }, { tier: "Silver", count: 120, pct: 32 }, { tier: "Gold", count: 51, pct: 14 }, { tier: "Platinum", count: 23, pct: 6 }].map(t => (
              <div key={t.tier} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: TIER_COLOR[t.tier] }}>{t.tier}</span>
                  <span style={{ fontSize: 12, color: "#71717a" }}>{t.count} members ({t.pct}%)</span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: "#f0f0f5", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${t.pct}%`, background: TIER_COLOR[t.tier], borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
          <div className="admin-card">
            <h3 className="admin-card__title">Points Activity</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[["Points Rate", "1 point per $1 spent"], ["Redemption", "100 points = $1 discount"], ["Expiry", "Points expire after 12 months"], ["Bonus Events", "2x points on weekends"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f0f5" }}>
                  <span style={{ fontSize: 13, color: "#71717a" }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1e1e2d" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
