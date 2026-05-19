import { Save } from "lucide-react";

export default function AdminSEOSettings() {
  return (
    <div className="admin-page" style={{ maxWidth: 800 }}>
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">SEO Settings</h1>
          <p className="admin-page__subtitle">Configure site-wide search engine optimization defaults.</p>
        </div>
        <button style={btnSolid}><Save size={14} /> Save Changes</button>
      </div>

      <div className="admin-card" style={{ marginBottom: 20 }}>
        <h3 className="admin-card__title">Global Meta Data</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Site Title Format</label>
            <input defaultValue="DermaCare | Clinical Skincare" style={inputStyle} />
            <p style={{ fontSize: 11, color: "#a1a1aa", marginTop: 4 }}>Displayed in browser tabs and search results.</p>
          </div>
          <div>
            <label style={labelStyle}>Default Meta Description</label>
            <textarea rows={3} defaultValue="DermaCare offers science-backed, clinical-grade skincare products formulated for sensitive, oily, and dry skin." style={{ ...inputStyle, resize: "vertical" }} />
          </div>
          <div>
            <label style={labelStyle}>Meta Keywords (Comma separated)</label>
            <input defaultValue="skincare, clinical skincare, DermaCare, niacinamide, hyaluronic acid" style={inputStyle} />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">Social Sharing (Open Graph)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Default OG Image URL</label>
            <input defaultValue="https://yourdomain.com/og-image.jpg" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Twitter Handle</label>
            <input defaultValue="@dermacare" style={inputStyle} />
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 12, fontWeight: 700, color: "#52525b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" };
const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #e4e4e7", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" };
const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
