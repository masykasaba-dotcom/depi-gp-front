import { Save } from "lucide-react";

export default function AdminStoreSettings() {
  return (
    <div className="admin-page" style={{ maxWidth: 800 }}>
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Store Settings</h1>
          <p className="admin-page__subtitle">General configuration for your store.</p>
        </div>
        <button style={btnSolid}><Save size={14} /> Save Changes</button>
      </div>

      <div className="admin-card" style={{ marginBottom: 20 }}>
        <h3 className="admin-card__title">Store Details</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Store Name</label>
            <input defaultValue="DermaCare" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Contact Email</label>
            <input defaultValue="support@dermacare.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Support Phone</label>
            <input defaultValue="+20 100 123 4567" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Currency</label>
            <select style={inputStyle}>
              <option>USD ($)</option>
              <option>EGP (E£)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Business Address</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Address Line 1</label>
            <input defaultValue="5 Industry Park Rd" style={inputStyle} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>City</label>
              <input defaultValue="Cairo" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Postal Code</label>
              <input defaultValue="12511" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Country</label>
              <input defaultValue="Egypt" style={inputStyle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 12, fontWeight: 700, color: "#52525b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" };
const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #e4e4e7", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" };
const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
