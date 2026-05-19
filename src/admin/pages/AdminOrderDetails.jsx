import { Link, useParams } from "react-router";
import { ChevronLeft, MapPin, CreditCard, Package, Printer, RefreshCw } from "lucide-react";

const STATUS_FLOW = ["pending", "paid", "processing", "shipped", "delivered"];
const STATUS_COLORS = {
  pending:    { bg: "#FEF3C7", text: "#92400E" },
  paid:       { bg: "#DBEAFE", text: "#1E40AF" },
  processing: { bg: "rgba(99,102,241,0.12)", text: "#4338ca" },
  shipped:    { bg: "#D1FAE5", text: "#065F46" },
  delivered:  { bg: "#D1FAE5", text: "#065F46" },
  cancelled:  { bg: "#FEE2E2", text: "#991B1B" },
};

const MOCK = {
  order_id: 1042,
  order_ref: "ORD-1042",
  status: "processing",
  created_at: "2025-05-15T10:23:00Z",
  total: 149.97,
  customer: { first_name: "Layla", last_name: "Hassan", email: "layla@example.com", phone: "+20 100 123 4567" },
  shipping: { address: "12 Tahrir St", city: "Cairo", country: "Egypt", postal_code: "11511" },
  items: [
    { name: "Hyaluronic Serum 2%", size: "30ml", qty: 2, price: 44.99 },
    { name: "Retinol Night Cream", size: "50ml", qty: 1, price: 59.99 },
  ],
  payment: { method: "Credit Card", last4: "4242", subtotal: 149.97, shipping_cost: 0, discount: 0 },
};

export default function AdminOrderDetails() {
  const { id } = useParams();
  const order = MOCK;
  const st = STATUS_COLORS[order.status] || { bg: "#f4f4f5", text: "#52525b" };
  const stepIdx = STATUS_FLOW.indexOf(order.status);

  return (
    <div className="admin-page" style={{ maxWidth: 960 }}>
      <div className="admin-page__header">
        <div>
          <Link to="/admin/orders" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6366f1", textDecoration: "none", marginBottom: 8, fontWeight: 600 }}>
            <ChevronLeft size={14} /> Back to Orders
          </Link>
          <h1 className="admin-page__title">{order.order_ref}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
            <span style={{ ...badgeStyle, background: st.bg, color: st.text }}>{order.status}</span>
            <span style={{ fontSize: 13, color: "#a1a1aa" }}>{new Date(order.created_at).toLocaleString()}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={btnOutline}><Printer size={14} /> Print</button>
          <button style={btnOutline}><RefreshCw size={14} /> Update Status</button>
          <Link to={`/admin/orders/${id}/shipping`} style={btnSolid}><Package size={14} /> Shipping Label</Link>
        </div>
      </div>

      {/* Progress */}
      <div className="admin-card" style={{ marginBottom: 20 }}>
        <h3 className="admin-card__title">Order Progress</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {STATUS_FLOW.map((s, i) => (
            <div key={s} style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: i <= stepIdx ? "#6366f1" : "#f0f0f5", color: i <= stepIdx ? "#fff" : "#a1a1aa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, transition: "all 0.3s" }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: i <= stepIdx ? "#6366f1" : "#a1a1aa", marginTop: 6, textTransform: "capitalize" }}>{s}</span>
              </div>
              {i < STATUS_FLOW.length - 1 && (
                <div style={{ height: 2, flex: 1, background: i < stepIdx ? "#6366f1" : "#f0f0f5", marginBottom: 18 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Items */}
          <div className="admin-card">
            <h3 className="admin-card__title">Order Items</h3>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < order.items.length - 1 ? "1px solid #f0f0f5" : "none" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 8, background: "#f0f0f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Package size={18} color="#a1a1aa" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#1e1e2d" }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#a1a1aa" }}>{item.size} × {item.qty}</div>
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: "#1e1e2d" }}>${(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Customer */}
          <div className="admin-card">
            <h3 className="admin-card__title">Customer Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["Name", `${order.customer.first_name} ${order.customer.last_name}`], ["Email", order.customer.email], ["Phone", order.customer.phone]].map(([k, v]) => (
                <div key={k}><div style={labelStyle}>{k}</div><div style={valueStyle}>{v}</div></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Payment Summary */}
          <div className="admin-card">
            <h3 className="admin-card__title"><CreditCard size={14} style={{ marginRight: 6 }} />Payment Summary</h3>
            {[["Subtotal", `$${order.payment.subtotal.toFixed(2)}`], ["Shipping", order.payment.shipping_cost === 0 ? "Free" : `$${order.payment.shipping_cost}`], ["Discount", order.payment.discount === 0 ? "—" : `-$${order.payment.discount}`]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13 }}>
                <span style={{ color: "#71717a" }}>{k}</span><span style={{ fontWeight: 600, color: "#1e1e2d" }}>{v}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #f0f0f5", marginTop: 10, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, color: "#1e1e2d" }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: 16, color: "#6366f1" }}>${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping */}
          <div className="admin-card">
            <h3 className="admin-card__title"><MapPin size={14} style={{ marginRight: 6 }} />Shipping Address</h3>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, margin: 0 }}>
              {order.shipping.address}<br />{order.shipping.city}, {order.shipping.country}<br />{order.shipping.postal_code}
            </p>
          </div>

          {/* Actions */}
          <div className="admin-card">
            <h3 className="admin-card__title">Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link to={`/admin/returns`} style={{ ...btnOutline, textAlign: "center", display: "block" }}>Process Refund</Link>
              <button style={{ ...btnOutline, color: "#ef4444", borderColor: "#fca5a5" }}>Cancel Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const badgeStyle = { padding: "3px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700, textTransform: "capitalize" };
const labelStyle = { fontSize: 10, fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 };
const valueStyle = { fontSize: 13, color: "#374151", fontWeight: 500 };
const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, textDecoration: "none" };
const btnOutline = { padding: "8px 14px", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 };
