import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, ExternalLink } from "lucide-react";
import { Link } from "react-router";

const POSTS = [
  { id: 1, title: "The Science of Niacinamide: Why It's a Must-Have", author: "Dr. L. Hassan", date: "2025-05-10", status: "published", views: 3420, category: "Ingredients" },
  { id: 2, title: "How to Build a Skincare Routine for Acne-Prone Skin", author: "M. Youssef", date: "2025-05-05", status: "published", views: 2150, category: "Routine" },
  { id: 3, title: "Summer Skincare Guide: Protecting Your Skin Barrier", author: "S. Ali", date: "2025-06-01", status: "draft", views: 0, category: "Seasonal" },
];

export default function AdminBlogManager() {
  const [posts, setPosts] = useState(POSTS);

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Blog Manager</h1>
          <p className="admin-page__subtitle">Manage articles, educational content, and skincare routines.</p>
        </div>
        <button style={btnSolid}><Plus size={14} /> New Post</button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8f9fc" }}>
              {["Title", "Author", "Category", "Date", "Status", "Views", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id} style={{ borderTop: "1px solid #f0f0f5" }}>
                <td style={{ padding: "14px 16px", fontWeight: 600, color: "#1e1e2d" }}>{p.title}</td>
                <td style={{ padding: "14px 16px", color: "#374151" }}>{p.author}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ background: "#f0f0f5", color: "#52525b", padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 600 }}>{p.category}</span>
                </td>
                <td style={{ padding: "14px 16px", color: "#71717a" }}>{p.date}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ background: p.status === "published" ? "#d1fae5" : "#fef3c7", color: p.status === "published" ? "#065f46" : "#92400e", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, textTransform: "capitalize" }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", color: "#6366f1", fontWeight: 600 }}>
                  <Eye size={12} style={{ marginRight: 4 }} />{p.views.toLocaleString()}
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
const btnOutline = { padding: "6px 10px", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 };
