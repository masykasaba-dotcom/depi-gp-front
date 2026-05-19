import { Search, Filter } from "lucide-react";

const LOGS = [
  { id: 1, user: "Ahmed Youssef", action: "Deleted Product: Retinol 1%", time: "10 mins ago", ip: "192.168.1.45" },
  { id: 2, user: "Sara Ali", action: "Updated Order #ORD-1042 status to Shipped", time: "1 hour ago", ip: "10.0.0.12" },
  { id: 3, user: "System", action: "Automated database backup completed", time: "3 hours ago", ip: "localhost" },
  { id: 4, user: "Omar Hassan", action: "Failed login attempt", time: "Yesterday", ip: "203.0.113.4" },
];

export default function AdminAuditLog() {
  return (
    <div className="admin-page" style={{ maxWidth: 900 }}>
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Audit Log</h1>
          <p className="admin-page__subtitle">Track administrative actions and system events.</p>
        </div>
        <button style={btnOutline}><Filter size={14} /> Filter</button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f5", display: "flex", alignItems: "center", gap: 10 }}>
          <Search size={16} color="#a1a1aa" />
          <input placeholder="Search logs..." style={{ border: "none", outline: "none", fontSize: 14, width: "100%" }} />
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8f9fc" }}>
              {["User", "Action", "Time", "IP Address"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LOGS.map(l => (
              <tr key={l.id} style={{ borderTop: "1px solid #f0f0f5" }}>
                <td style={{ padding: "14px 16px", fontWeight: 600, color: "#1e1e2d" }}>{l.user}</td>
                <td style={{ padding: "14px 16px", color: "#374151" }}>{l.action}</td>
                <td style={{ padding: "14px 16px", color: "#71717a" }}>{l.time}</td>
                <td style={{ padding: "14px 16px", color: "#a1a1aa", fontFamily: "monospace" }}>{l.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const btnOutline = { padding: "8px 14px", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 };
