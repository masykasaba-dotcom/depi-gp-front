import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, User, ChevronRight } from "lucide-react";

const CUSTOMERS = [
  { id: 1, name: "Layla Hassan",  email: "layla@example.com",   joined: "2024-11-02", orders: 8,  spent: 412.40, skin: "Oily",       status: "active" },
  { id: 2, name: "Omar Karim",    email: "omar@example.com",    joined: "2024-12-14", orders: 3,  spent: 134.97, skin: "Dry",        status: "active" },
  { id: 3, name: "Sara Ali",      email: "sara@example.com",    joined: "2025-01-05", orders: 12, spent: 618.82, skin: "Sensitive",  status: "vip" },
  { id: 4, name: "Nour Ibrahim",  email: "nour@example.com",    joined: "2025-02-20", orders: 1,  spent: 34.99,  skin: "Combination",status: "new" },
  { id: 5, name: "Youssef Adel",  email: "youssef@example.com", joined: "2024-09-10", orders: 5,  spent: 229.95, skin: "Normal",     status: "active" },
  { id: 6, name: "Mona Fathy",    email: "mona@example.com",    joined: "2025-03-01", orders: 0,  spent: 0,      skin: "—",          status: "inactive" },
];

const STATUS = {
  active:   { bg: "#d1fae5", color: "#065f46" },
  vip:      { bg: "rgba(99,102,241,0.12)", color: "#4338ca" },
  new:      { bg: "#dbeafe", color: "#1e40af" },
  inactive: { bg: "#f4f4f5", color: "#71717a" },
};

export default function AdminCustomersList() {
  const [search, setSearch] = useState("");
  const filtered = CUSTOMERS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Customers</h1>
          <p className="admin-page__subtitle">View and manage your customer base.</p>
        </div>
        <button style={btnOutline}><Filter size={14} /> Export CSV</button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Customers", value: CUSTOMERS.length, color: "#6366f1" },
          { label: "VIP", value: CUSTOMERS.filter(c => c.status === "vip").length, color: "#8b5cf6" },
          { label: "New This Month", value: CUSTOMERS.filter(c => c.status === "new").length, color: "#3b82f6" },
          { label: "Inactive", value: CUSTOMERS.filter(c => c.status === "inactive").length, color: "#a1a1aa" },
        ].map(s => (
          <div key={s.label} className="admin-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#71717a", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 20, maxWidth: 360 }}>
        <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#a1a1aa" }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..." style={{ ...searchStyle, paddingLeft: 36, width: "100%" }} />
      </div>

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8f9fc" }}>
              {["Customer", "Email", "Joined", "Orders", "Total Spent", "Skin Type", "Status", ""].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const s = STATUS[c.status];
              return (
                <tr key={c.id} style={{ borderTop: "1px solid #f0f0f5" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <User size={16} color="#6366f1" />
                      </div>
                      <span style={{ fontWeight: 600, color: "#1e1e2d" }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#71717a" }}>{c.email}</td>
                  <td style={{ padding: "14px 16px", color: "#71717a" }}>{c.joined}</td>
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: "#1e1e2d" }}>{c.orders}</td>
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: "#1e1e2d" }}>${c.spent.toFixed(2)}</td>
                  <td style={{ padding: "14px 16px", color: "#71717a" }}>{c.skin}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, textTransform: "capitalize" }}>{c.status}</span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <Link to={`/admin/customers/${c.id}`} style={{ color: "#6366f1", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 2, fontSize: 12 }}>
                      Profile <ChevronRight size={12} />
                    </Link>
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

const btnOutline = { padding: "8px 14px", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 };
const searchStyle = { padding: "8px 12px", border: "1px solid #e4e4e7", borderRadius: 8, fontSize: 13, outline: "none", background: "#f8f9fc" };
