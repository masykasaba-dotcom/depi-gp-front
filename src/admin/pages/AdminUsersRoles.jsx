import { Plus, Shield, Edit2, Trash2 } from "lucide-react";

const USERS = [
  { id: 1, name: "Ahmed Youssef", email: "admin@dermacare.com", role: "Super Admin", status: "active" },
  { id: 2, name: "Sara Ali", email: "sara@dermacare.com", role: "Editor", status: "active" },
  { id: 3, name: "Omar Hassan", email: "omar@dermacare.com", role: "Support Agent", status: "inactive" },
];

export default function AdminUsersRoles() {
  return (
    <div className="admin-page" style={{ maxWidth: 900 }}>
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Users & Roles</h1>
          <p className="admin-page__subtitle">Manage admin access and permissions.</p>
        </div>
        <button style={btnSolid}><Plus size={14} /> Add User</button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8f9fc" }}>
              {["User", "Email", "Role", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {USERS.map(u => (
              <tr key={u.id} style={{ borderTop: "1px solid #f0f0f5" }}>
                <td style={{ padding: "14px 16px", fontWeight: 600, color: "#1e1e2d", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f0f0f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {u.name[0]}
                  </div>
                  {u.name}
                </td>
                <td style={{ padding: "14px 16px", color: "#71717a" }}>{u.email}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(99,102,241,0.1)", color: "#4338ca", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>
                    <Shield size={10} /> {u.role}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ background: u.status === "active" ? "#d1fae5" : "#f4f4f5", color: u.status === "active" ? "#065f46" : "#71717a", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, textTransform: "capitalize" }}>
                    {u.status}
                  </span>
                </td>
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
