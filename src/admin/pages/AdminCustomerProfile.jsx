import { Link, useParams } from "react-router";
import { ChevronLeft, ShoppingBag, Star, Heart, Award } from "lucide-react";

const CUSTOMER = {
  id: 1, name: "Layla Hassan", email: "layla@example.com", phone: "+20 100 123 4567",
  joined: "November 2, 2024", skin: "Oily", concerns: ["Acne", "Pores", "Oiliness"],
  address: "12 Tahrir St, Cairo, Egypt", points: 820, tier: "Gold",
  orders: [
    { id: "ORD-1042", date: "2025-05-15", total: 149.97, status: "processing" },
    { id: "ORD-1015", date: "2025-04-10", total: 89.98, status: "delivered" },
    { id: "ORD-997",  date: "2025-03-22", total: 44.99, status: "delivered" },
  ],
  quiz: { completed: true, lastUpdated: "2025-04-10", type: "Oily, Acne-prone" },
  wishlist: ["Hyaluronic Serum 2%", "Niacinamide 10% Booster"],
};

const STATUS_COLORS = {
  processing: { bg: "rgba(99,102,241,0.12)", color: "#4338ca" },
  delivered:  { bg: "#d1fae5", color: "#065f46" },
  shipped:    { bg: "#d1fae5", color: "#065f46" },
};

export default function AdminCustomerProfile() {
  const { id } = useParams();
  const c = CUSTOMER;

  return (
    <div className="admin-page" style={{ maxWidth: 980 }}>
      <div className="admin-page__header">
        <div>
          <Link to="/admin/customers" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6366f1", textDecoration: "none", marginBottom: 8, fontWeight: 600 }}>
            <ChevronLeft size={14} /> Back to Customers
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#6366f1" }}>
              {c.name[0]}
            </div>
            <div>
              <h1 className="admin-page__title" style={{ margin: 0 }}>{c.name}</h1>
              <p className="admin-page__subtitle" style={{ margin: 0 }}>{c.email} · Joined {c.joined}</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={btnOutline}>Send Email</button>
          <button style={btnSolid}>Edit Profile</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Order History */}
          <div className="admin-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 className="admin-card__title" style={{ margin: 0 }}><ShoppingBag size={14} style={{ marginRight: 6 }} />Order History</h3>
              <span style={{ fontSize: 12, color: "#6366f1", fontWeight: 600 }}>{c.orders.length} orders · ${c.orders.reduce((s, o) => s + o.total, 0).toFixed(2)} total</span>
            </div>
            {c.orders.map(o => {
              const s = STATUS_COLORS[o.status] || { bg: "#f4f4f5", color: "#71717a" };
              return (
                <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0f0f5" }}>
                  <div>
                    <Link to={`/admin/orders/${o.id}`} style={{ fontWeight: 700, color: "#6366f1", textDecoration: "none", fontSize: 14 }}>{o.id}</Link>
                    <div style={{ fontSize: 12, color: "#a1a1aa", marginTop: 2 }}>{o.date}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "#1e1e2d" }}>${o.total.toFixed(2)}</div>
                    <span style={{ background: s.bg, color: s.color, padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700, textTransform: "capitalize" }}>{o.status}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wishlist */}
          <div className="admin-card">
            <h3 className="admin-card__title"><Heart size={14} style={{ marginRight: 6 }} />Wishlist</h3>
            {c.wishlist.map((w, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < c.wishlist.length - 1 ? "1px solid #f0f0f5" : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f0f0f5" }} />
                <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{w}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Loyalty */}
          <div className="admin-card" style={{ background: "linear-gradient(135deg, #1e1e2d, #374151)", color: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Loyalty Tier</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{c.tier} Member</div>
              </div>
              <Award size={28} color="#f59e0b" />
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, margin: "8px 0 4px" }}>{c.points}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Points available</div>
          </div>

          {/* Skin Profile */}
          <div className="admin-card">
            <h3 className="admin-card__title"><Star size={14} style={{ marginRight: 6 }} />Skin Profile</h3>
            {[["Skin Type", c.skin], ["Concerns", c.concerns.join(", ")], ["Quiz Status", c.quiz.completed ? "Completed" : "Not taken"], ["Last Updated", c.quiz.lastUpdated]].map(([k, v]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="admin-card">
            <h3 className="admin-card__title">Contact Info</h3>
            {[["Phone", c.phone], ["Address", c.address]].map(([k, v]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
const btnOutline = { padding: "8px 14px", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 };
