import { useState } from "react";
import { Plus, Search, FlaskConical, X } from "lucide-react";

const INGREDIENTS = [
  { id: 1, name: "Niacinamide", inci: "Niacinamide", category: "Vitamin", concentration: "2–10%", skin: ["Oily", "Combination", "Sensitive"], function: "Pore-minimizing, brightening, sebum-regulating" },
  { id: 2, name: "Hyaluronic Acid", inci: "Sodium Hyaluronate", category: "Humectant", concentration: "0.1–2%", skin: ["All"], function: "Deep hydration, plumping effect" },
  { id: 3, name: "Retinol", inci: "Retinol", category: "Retinoid", concentration: "0.01–1%", skin: ["Normal", "Combination"], function: "Anti-aging, cell turnover, collagen stimulation" },
  { id: 4, name: "Salicylic Acid", inci: "Salicylic Acid", category: "BHA", concentration: "0.5–2%", skin: ["Oily", "Acne-prone"], function: "Exfoliation, anti-acne, pore-clearing" },
  { id: 5, name: "Vitamin C", inci: "L-Ascorbic Acid", category: "Antioxidant", concentration: "5–20%", skin: ["Dull", "Aging"], function: "Brightening, antioxidant, collagen synthesis" },
  { id: 6, name: "Ceramide NP", inci: "Ceramide NP", category: "Lipid", concentration: "0.1–1%", skin: ["Dry", "Sensitive"], function: "Barrier repair, moisture retention" },
  { id: 7, name: "Azelaic Acid", inci: "Azelaic Acid", category: "Acid", concentration: "5–20%", skin: ["Sensitive", "Rosacea"], function: "Anti-inflammatory, brightening, anti-acne" },
];

const CATS = ["All", "Vitamin", "Humectant", "Retinoid", "BHA", "Antioxidant", "Lipid", "Acid"];

export default function AdminIngredientsDB() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = INGREDIENTS.filter(i =>
    (cat === "All" || i.category === cat) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Ingredients Database</h1>
          <p className="admin-page__subtitle">Clinical reference library for all active and inactive ingredients.</p>
        </div>
        <button style={btnSolid}><Plus size={14} /> Add Ingredient</button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#a1a1aa" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ingredients..." style={{ ...searchStyle, paddingLeft: 32 }} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: "7px 14px", borderRadius: 20, border: "1px solid #e4e4e7", fontSize: 12, fontWeight: 600, cursor: "pointer", background: cat === c ? "#1e1e2d" : "#fff", color: cat === c ? "#fff" : "#71717a" }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: 20 }}>
        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filtered.map(ing => (
            <div key={ing.id} onClick={() => setSelected(ing)} className="admin-card" style={{ cursor: "pointer", transition: "all 0.2s", border: selected?.id === ing.id ? "2px solid #6366f1" : "1px solid #f0f0f5" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FlaskConical size={18} color="#6366f1" />
                </div>
                <span style={{ background: "#f0f0f5", color: "#52525b", padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>{ing.category}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1e1e2d", marginBottom: 2 }}>{ing.name}</div>
              <div style={{ fontSize: 11, color: "#a1a1aa", marginBottom: 8, fontFamily: "monospace" }}>{ing.inci}</div>
              <div style={{ fontSize: 12, color: "#52525b", lineHeight: 1.5 }}>{ing.function}</div>
              <div style={{ marginTop: 12, display: "flex", gap: 4, flexWrap: "wrap" }}>
                {ing.skin.map(s => <span key={s} style={{ background: "rgba(16,185,129,0.1)", color: "#065f46", padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700 }}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="admin-card" style={{ position: "sticky", top: 20, alignSelf: "flex-start" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#1e1e2d", margin: 0 }}>{selected.name}</h3>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#a1a1aa" }}><X size={16} /></button>
            </div>
            {[
              ["INCI Name", selected.inci],
              ["Category", selected.category],
              ["Recommended %", selected.concentration],
              ["Function", selected.function],
              ["Suitable Skin", selected.skin.join(", ")],
            ].map(([k, v]) => (
              <div key={k} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{v}</div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              <button style={{ ...btnSolid, flex: 1 }}>Edit</button>
              <button style={{ ...btnOutline, flex: 1 }}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
const btnOutline = { padding: "8px 14px", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none" };
const searchStyle = { padding: "8px 12px", border: "1px solid #e4e4e7", borderRadius: 8, fontSize: 13, outline: "none", background: "#f8f9fc" };
