import { useState } from "react";
import { Image, Plus, Edit2, Trash2, Eye } from "lucide-react";

const BANNERS = [
  { id: 1, title: "Summer Glow Campaign", page: "Home Hero", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=150&fit=crop", link: "/products?cat=serum", active: true, clicks: 1240 },
  { id: 2, title: "Niacinamide Feature",  page: "Products Top", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=150&fit=crop", link: "/products/niacinamide", active: true, clicks: 890 },
  { id: 3, title: "Loyalty Promo",        page: "Cart Page", image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=150&fit=crop", link: "/loyalty", active: false, clicks: 342 },
];

const PAGES_OPTIONS = ["Home Hero", "Products Top", "Cart Page", "Checkout", "Category Page"];

export default function AdminCMSBanners() {
  const [banners, setBanners] = useState(BANNERS);
  const [showNew, setShowNew] = useState(false);

  const toggleActive = (id) => setBanners(bs => bs.map(b => b.id === id ? { ...b, active: !b.active } : b));

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">CMS / Banners</h1>
          <p className="admin-page__subtitle">Manage promotional banners, hero images, and page content.</p>
        </div>
        <button onClick={() => setShowNew(!showNew)} style={btnSolid}><Plus size={14} /> New Banner</button>
      </div>

      {/* New Banner Form */}
      {showNew && (
        <div className="admin-card" style={{ marginBottom: 24, borderTop: "3px solid #6366f1" }}>
          <h3 className="admin-card__title">Create New Banner</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            <div>
              <label style={labelStyle}>Banner Title</label>
              <input placeholder="e.g. Summer Campaign" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Target Page</label>
              <select style={inputStyle}>
                {PAGES_OPTIONS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Image URL</label>
              <input placeholder="https://..." style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Link URL</label>
              <input placeholder="/products?cat=serum" style={inputStyle} />
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input type="checkbox" defaultChecked />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Active</span>
              </label>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button style={btnSolid}>Create Banner</button>
            <button onClick={() => setShowNew(false)} style={btnOutline}>Cancel</button>
          </div>
        </div>
      )}

      {/* Banner grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {banners.map(b => (
          <div key={b.id} className="admin-card" style={{ padding: 0, overflow: "hidden", opacity: b.active ? 1 : 0.6 }}>
            <div style={{ position: "relative" }}>
              <img src={b.image} alt={b.title} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }}
                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
              <div style={{ display: "none", width: "100%", height: 140, background: "#f0f0f5", alignItems: "center", justifyContent: "center" }}>
                <Image size={32} color="#a1a1aa" />
              </div>
              <div style={{ position: "absolute", top: 8, right: 8 }}>
                <span style={{ background: b.active ? "#d1fae5" : "#f4f4f5", color: b.active ? "#065f46" : "#71717a", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>
                  {b.active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1e1e2d", marginBottom: 4 }}>{b.title}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: "#a1a1aa" }}>{b.page}</span>
                <span style={{ fontSize: 12, color: "#6366f1", fontWeight: 600 }}><Eye size={11} style={{ marginRight: 3 }} />{b.clicks.toLocaleString()} clicks</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => toggleActive(b.id)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", color: b.active ? "#ef4444" : "#10b981" }}>
                  {b.active ? "Deactivate" : "Activate"}
                </button>
                <button style={{ ...btnOutline, padding: "7px 12px" }}><Edit2 size={13} /></button>
                <button style={{ ...btnOutline, padding: "7px 12px", color: "#ef4444", borderColor: "#fca5a5" }}><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 12, fontWeight: 700, color: "#52525b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" };
const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #e4e4e7", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" };
const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
const btnOutline = { padding: "8px 14px", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 };
