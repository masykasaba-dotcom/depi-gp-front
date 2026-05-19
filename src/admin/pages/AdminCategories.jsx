import { useState } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import {
  useAdminCategories, useCreateCategory, useUpdateCategory, useDeleteCategory,
} from "../hooks/useAdminAPI";
import { toast } from "sonner";

export default function AdminCategories() {
  const { data: categories = [], isLoading } = useAdminCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const catArray = Array.isArray(categories) ? categories : [];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    toast.promise(
      new Promise((resolve, reject) =>
        createCategory.mutate({ category_name: newName.trim(), description: newDesc.trim() || undefined }, {
          onSuccess: () => { setNewName(""); setNewDesc(""); resolve(); },
          onError: reject,
        })
      ),
      { loading: "Creating...", success: "Category created!", error: "Failed to create." }
    );
  };

  const startEdit = (cat) => {
    setEditId(cat.category_id);
    setEditName(cat.category_name);
    setEditDesc(cat.description || "");
  };

  const handleUpdate = () => {
    if (!editName.trim()) return;
    toast.promise(
      new Promise((resolve, reject) =>
        updateCategory.mutate({ id: editId, body: { category_name: editName.trim(), description: editDesc.trim() || undefined } }, {
          onSuccess: () => { setEditId(null); resolve(); },
          onError: reject,
        })
      ),
      { loading: "Saving...", success: "Category updated!", error: "Failed to update." }
    );
  };

  const handleDelete = (id, name) => {
    if (!confirm(`Delete category "${name}"? This cannot be undone.`)) return;
    toast.promise(
      new Promise((resolve, reject) =>
        deleteCategory.mutate(id, { onSuccess: resolve, onError: reject })
      ),
      { loading: "Deleting...", success: "Category deleted.", error: "Cannot delete — products may still be linked." }
    );
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <p style={labelStyle}>Organization</p>
          <h1 className="admin-page__title">Categories</h1>
          <p className="admin-page__subtitle">Manage product taxonomies for your catalog.</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 24 }}>

        {/* Create Form */}
        <div>
          <div className="admin-card" style={{ position: "sticky", top: 24 }}>
            <h3 className="admin-card__title">New Category</h3>
            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={fieldLabel}>Category Name <span style={{ color: "#ef4444" }}>*</span></label>
                <input
                  required value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Serums & Actives"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={fieldLabel}>Description <span style={{ color: "#a1a1aa", fontWeight: 400 }}>(optional)</span></label>
                <textarea
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Describe this category..."
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
              <button type="submit" style={btnSolid} disabled={createCategory.isPending}>
                <Plus size={14} /> {createCategory.isPending ? "Creating..." : "Create Category"}
              </button>
            </form>
          </div>
        </div>

        {/* Categories Table */}
        <div className="admin-card" style={{ padding: 0, overflow: "hidden", alignSelf: "start" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="admin-card__title" style={{ margin: 0 }}>All Categories</h3>
            <span style={{ fontSize: 13, color: "#a1a1aa" }}>{catArray.length} total</span>
          </div>

          {isLoading ? (
            <div style={{ padding: 40, textAlign: "center", color: "#a1a1aa" }}>Loading categories...</div>
          ) : catArray.length === 0 ? (
            <div style={{ padding: 48, textAlign: "center", color: "#a1a1aa", fontSize: 14 }}>
              No categories yet. Create your first one.
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead style={{ background: "#fafaf9" }}>
                <tr style={{ borderBottom: "1px solid #f0f0f5" }}>
                  {["Category", "Description", "Products", "Actions"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 16px", color: "#71717a", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {catArray.map((cat) => (
                  <tr key={cat.category_id} style={{ borderBottom: "1px solid #f9f9fb" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#fafaf9"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "12px 16px" }}>
                      {editId === cat.category_id ? (
                        <input value={editName} onChange={e => setEditName(e.target.value)} style={{ ...inputStyle, padding: "6px 10px", fontSize: 13 }} autoFocus />
                      ) : (
                        <span style={{ fontWeight: 600, color: "#1e1e2d" }}>{cat.category_name}</span>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#71717a", maxWidth: 240 }}>
                      {editId === cat.category_id ? (
                        <input value={editDesc} onChange={e => setEditDesc(e.target.value)} style={{ ...inputStyle, padding: "6px 10px", fontSize: 13 }} placeholder="Description..." />
                      ) : (
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
                          {cat.description || <span style={{ color: "#d4d4d8", fontStyle: "italic" }}>—</span>}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ background: "#f4f4f5", color: "#52525b", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                        {cat._count?.products ?? cat.products?.length ?? 0}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {editId === cat.category_id ? (
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={handleUpdate} style={{ ...iconBtn, borderColor: "#6ee7b7", color: "#059669" }} title="Save">
                            <Check size={14} />
                          </button>
                          <button onClick={() => setEditId(null)} style={{ ...iconBtn, borderColor: "#fca5a5", color: "#ef4444" }} title="Cancel">
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => startEdit(cat)} style={{ ...iconBtn, borderColor: "#c7d2fe", color: "#6366f1" }} title="Edit">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDelete(cat.category_id, cat.category_name)} style={{ ...iconBtn, borderColor: "#fca5a5", color: "#ef4444" }} title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const labelStyle = { fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 4 };
const fieldLabel = { display: "block", fontSize: 11, fontWeight: 700, color: "#52525b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" };
const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #e4e4e7", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box", color: "#1e1e2d" };
const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, width: "100%", justifyContent: "center" };
const iconBtn = { width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 7, border: "1px solid", background: "#fff", cursor: "pointer" };
