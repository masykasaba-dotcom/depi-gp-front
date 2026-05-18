import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Plus, Trash2, Save, X, ChevronLeft } from "lucide-react";
import { useAdminCategories, useCreateProduct, useUpdateProduct } from "../../hooks/useAdminAPI";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../../lib/apiUrl";
import { toast } from "sonner";

function useProduct(id) {
  return useQuery({
    queryKey: ["adminProduct", id],
    queryFn: async () => {
      const token = localStorage.getItem("admin-token");
      const { data } = await axios.get(`${apiUrl}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data;
    },
    enabled: !!id && id !== "new",
  });
}

const emptyVariant = () => ({ size: "", price: "", stock: 0 });
const emptyImage = () => ({ image_url: "", is_primary: false });

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const { data: product, isLoading: productLoading } = useProduct(id);
  const { data: categories = [] } = useAdminCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct(parseInt(id));

  const [form, setForm] = useState({
    product_name: "",
    description: "",
    category_id: "",
    variants: [emptyVariant()],
    images: [emptyImage()],
  });

  useEffect(() => {
    if (product && !isNew) {
      setForm({
        product_name: product.product_name || "",
        description: product.description || "",
        category_id: product.category_id || "",
        variants: product.variants?.length ? product.variants.map(v => ({ size: v.size || "", price: v.price || "", stock: v.stock ?? 0 })) : [emptyVariant()],
        images: product.images?.length ? product.images.map(i => ({ image_url: i.image_url, is_primary: i.is_primary })) : [emptyImage()],
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      product_name: form.product_name,
      description: form.description,
      category_id: parseInt(form.category_id),
      variants: form.variants.filter(v => v.price).map(v => ({ size: v.size, price: parseFloat(v.price), stock: parseInt(v.stock) || 0 })),
      images: form.images.filter(i => i.image_url).map(i => ({ image_url: i.image_url, is_primary: i.is_primary })),
    };

    const mutate = isNew ? createProduct : updateProduct;
    toast.promise(
      new Promise((resolve, reject) => {
        mutate.mutate(isNew ? payload : { product_name: payload.product_name, description: payload.description, category_id: payload.category_id }, {
          onSuccess: () => { navigate("/admin/products"); resolve(); },
          onError: reject,
        });
      }),
      { loading: isNew ? "Creating product..." : "Saving changes...", success: isNew ? "Product created!" : "Product updated!", error: "Failed." }
    );
  };

  if (!isNew && productLoading) {
    return <div style={{ padding: 40, color: "#a1a1aa" }}>Loading product...</div>;
  }

  return (
    <div className="admin-page" style={{ maxWidth: 960 }}>
      {/* Header */}
      <div className="admin-page__header">
        <div>
          <Link to="/admin/products" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6366f1", textDecoration: "none", marginBottom: 8, fontWeight: 600 }}>
            <ChevronLeft size={14} /> Back to Inventory
          </Link>
          <h1 className="admin-page__title">{isNew ? "Add Product" : "Edit Product"}</h1>
          <p className="admin-page__subtitle">{isNew ? "Create a new formulation in your catalog." : `Editing: ${product?.product_name}`}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link to="/admin/products" style={btnOutline}>Discard</Link>
          <button form="product-form" type="submit" style={btnSolid}>
            <Save size={14} /> {isNew ? "Create Product" : "Save Changes"}
          </button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>

        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Basic Info */}
          <div className="admin-card">
            <h3 className="admin-card__title">Basic Information</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Field label="Product Name" required>
                <input required value={form.product_name} onChange={e => setForm(f => ({ ...f, product_name: e.target.value }))}
                  placeholder="e.g. Advanced Hyaluronic Serum" style={inputStyle} />
              </Field>
              <Field label="Description">
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Describe the product's benefits, texture, and clinical results..." rows={4}
                  style={{ ...inputStyle, resize: "vertical" }} />
              </Field>
            </div>
          </div>

          {/* Images */}
          <div className="admin-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 className="admin-card__title" style={{ margin: 0 }}>Images</h3>
              <button type="button" onClick={() => setForm(f => ({ ...f, images: [...f.images, emptyImage()] }))} style={btnSmallOutline}>
                <Plus size={12} /> Add Image
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {form.images.map((img, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <input value={img.image_url} onChange={e => { const imgs = [...form.images]; imgs[i].image_url = e.target.value; setForm(f => ({ ...f, images: imgs })); }}
                      placeholder="https://..." style={inputStyle} />
                    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#52525b", cursor: "pointer" }}>
                      <input type="checkbox" checked={img.is_primary} onChange={e => { const imgs = form.images.map((im, idx) => ({ ...im, is_primary: idx === i ? e.target.checked : false })); setForm(f => ({ ...f, images: imgs })); }} />
                      Set as primary image
                    </label>
                    {img.image_url && (
                      <img src={img.image_url} alt="preview" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: "1px solid #e4e4e7" }} onError={e => e.target.style.display = "none"} />
                    )}
                  </div>
                  {form.images.length > 1 && (
                    <button type="button" onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))}
                      style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "1px solid #fca5a5", color: "#ef4444", background: "#fff", cursor: "pointer", flexShrink: 0 }}>
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Variants */}
          <div className="admin-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 className="admin-card__title" style={{ margin: 0 }}>Variants & Pricing</h3>
              <button type="button" onClick={() => setForm(f => ({ ...f, variants: [...f.variants, emptyVariant()] }))} style={btnSmallOutline}>
                <Plus size={12} /> Add Variant
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Header row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 32px", gap: 8 }}>
                {["Size / Name", "Price ($)", "Stock"].map(h => (
                  <span key={h} style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#a1a1aa" }}>{h}</span>
                ))}
              </div>
              {form.variants.map((v, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 32px", gap: 8, alignItems: "center" }}>
                  <input value={v.size} onChange={e => { const vars = [...form.variants]; vars[i].size = e.target.value; setForm(f => ({ ...f, variants: vars })); }}
                    placeholder="e.g. 30ml" style={inputStyle} />
                  <input type="number" min="0" step="0.01" value={v.price} onChange={e => { const vars = [...form.variants]; vars[i].price = e.target.value; setForm(f => ({ ...f, variants: vars })); }}
                    placeholder="0.00" style={inputStyle} />
                  <input type="number" min="0" value={v.stock} onChange={e => { const vars = [...form.variants]; vars[i].stock = e.target.value; setForm(f => ({ ...f, variants: vars })); }}
                    placeholder="0" style={inputStyle} />
                  {form.variants.length > 1 && (
                    <button type="button" onClick={() => setForm(f => ({ ...f, variants: f.variants.filter((_, idx) => idx !== i) }))}
                      style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, border: "1px solid #fca5a5", color: "#ef4444", background: "#fff", cursor: "pointer" }}>
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Organization */}
          <div className="admin-card">
            <h3 className="admin-card__title">Organization</h3>
            <Field label="Category" required>
              <select required value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))} style={inputStyle}>
                <option value="">Select Category...</option>
                {(Array.isArray(categories) ? categories : []).map(cat => (
                  <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* Tips */}
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#15803d", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>💡 Tips</p>
            <ul style={{ fontSize: 12, color: "#166534", lineHeight: 1.7, margin: 0, paddingLeft: 16 }}>
              <li>Add at least one variant with a price</li>
              <li>Use a primary image for best display</li>
              <li>Detailed descriptions improve recommendations</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#52525b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #e4e4e7", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box", background: "#fff", color: "#1e1e2d" };
const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, textDecoration: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
const btnOutline = { padding: "8px 14px", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none" };
const btnSmallOutline = { padding: "5px 10px", borderRadius: 6, border: "1px solid #e4e4e7", background: "#fff", color: "#52525b", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 };
