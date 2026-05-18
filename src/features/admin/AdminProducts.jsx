import { useState } from "react";
import { Link } from "react-router";
import { Search, Plus, Trash2, Edit2, AlertCircle } from "lucide-react";
import { useAdminProducts, useDeleteProduct } from "../../hooks/useAdminAPI";
import { toast } from "sonner";

const STOCK_STATUS = (stock) => {
  if (stock === 0) return { label: "Out of Stock", bg: "#FEE2E2", text: "#991B1B" };
  if (stock <= 10) return { label: "Low Stock", bg: "#FEF3C7", text: "#92400E" };
  return { label: "In Stock", bg: "#D1FAE5", text: "#065F46" };
};

export default function AdminProducts() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useAdminProducts(page, 10, search);
  const { mutate: deleteProduct } = useDeleteProduct();

  const products = data?.data || [];
  const meta = data?.meta || {};

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleDelete = (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    toast.promise(
      new Promise((resolve, reject) => deleteProduct(id, { onSuccess: resolve, onError: reject })),
      { loading: "Deleting...", success: "Product deleted.", error: "Failed to delete." }
    );
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <p style={labelStyle}>Inventory</p>
          <h1 className="admin-page__title">Product Inventory</h1>
          <p className="admin-page__subtitle">Manage your catalog, stock levels, and pricing.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link to="/admin/products/new" style={btnSolid}>
            <Plus size={14} /> Add Product
          </Link>
        </div>
      </div>

      {/* Search & Filters bar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, flex: 1 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#a1a1aa" }} />
            <input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search products..."
              style={{ width: "100%", paddingLeft: 36, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: "1px solid #e4e4e7", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <button type="submit" style={btnOutline}>Search</button>
          {search && (
            <button type="button" onClick={() => { setSearch(""); setSearchInput(""); setPage(1); }} style={{ ...btnOutline, color: "#ef4444", borderColor: "#fca5a5" }}>
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead style={{ background: "#fafaf9" }}>
            <tr style={{ borderBottom: "1px solid #f0f0f5" }}>
              {["Product", "Category", "Variants", "Stock", "Price", "Actions"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", color: "#71717a", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f9f9fb" }}>
                  {[...Array(6)].map((_, j) => (
                    <td key={j} style={{ padding: "14px 16px" }}>
                      <div style={{ height: 14, background: "#f4f4f5", borderRadius: 4, width: j === 0 ? "80%" : "50%" }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "48px 20px", textAlign: "center", color: "#a1a1aa", fontSize: 14 }}>
                  No products found.
                </td>
              </tr>
            ) : products.map((product) => {
              const primaryImage = product.images?.find(i => i.is_primary)?.image_url || product.images?.[0]?.image_url;
              const minPrice = product.variants?.length ? Math.min(...product.variants.map(v => Number(v.price))) : null;
              const totalStock = product.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) ?? 0;
              const stockStatus = STOCK_STATUS(totalStock);

              return (
                <tr key={product.product_id} style={{ borderBottom: "1px solid #f9f9fb" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafaf9"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {/* Product */}
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 8, background: "#f4f4f5", overflow: "hidden", flexShrink: 0 }}>
                        {primaryImage ? (
                          <img src={primaryImage} alt={product.product_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#d4d4d4" }}>
                            <AlertCircle size={16} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: 600, color: "#1e1e2d", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {product.product_name}
                        </p>
                        <p style={{ margin: 0, fontSize: 11, color: "#a1a1aa" }}>ID: {product.product_id}</p>
                      </div>
                    </div>
                  </td>
                  {/* Category */}
                  <td style={{ padding: "12px 16px", color: "#52525b" }}>
                    {product.category?.category_name || "—"}
                  </td>
                  {/* Variants */}
                  <td style={{ padding: "12px 16px", color: "#52525b" }}>
                    {product.variants?.length ?? 0} variant{product.variants?.length !== 1 ? "s" : ""}
                  </td>
                  {/* Stock */}
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ background: stockStatus.bg, color: stockStatus.text, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                      {totalStock} · {stockStatus.label}
                    </span>
                  </td>
                  {/* Price */}
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "#1e1e2d" }}>
                    {minPrice !== null ? `$${minPrice.toFixed(2)}` : "—"}
                  </td>
                  {/* Actions */}
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link to={`/admin/products/${product.product_id}/edit`}
                        style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "1px solid #e4e4e7", color: "#6366f1", background: "#fff", textDecoration: "none" }}
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.product_id, product.product_name)}
                        style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "1px solid #fca5a5", color: "#ef4444", background: "#fff", cursor: "pointer" }}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta.pages > 1 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, fontSize: 13 }}>
          <span style={{ color: "#a1a1aa" }}>
            Showing {((page - 1) * 10) + 1}–{Math.min(page * 10, meta.total)} of {meta.total} products
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={btnOutline}>← Prev</button>
            {[...Array(Math.min(meta.pages, 5))].map((_, i) => {
              const pg = i + 1;
              return (
                <button key={pg} onClick={() => setPage(pg)} style={{ ...btnOutline, background: page === pg ? "#1e1e2d" : "#fff", color: page === pg ? "#fff" : "#1e1e2d", minWidth: 36 }}>
                  {pg}
                </button>
              );
            })}
            <button onClick={() => setPage(p => Math.min(meta.pages, p + 1))} disabled={page === meta.pages} style={btnOutline}>Next →</button>
          </div>
        </div>
      )}
    </div>
  );
}

const labelStyle = { fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: 4 };
const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, textDecoration: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
const btnOutline = { padding: "8px 14px", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 13, fontWeight: 600, cursor: "pointer" };
