import { Link } from "react-router";
import { Printer, Download, Package, MapPin, ChevronLeft } from "lucide-react";

const LABEL = {
  order_ref: "ORD-1042",
  from: { name: "DermaCare Fulfillment Center", address: "5 Industry Park Rd, Cairo, Egypt 12511" },
  to:   { name: "Layla Hassan", address: "12 Tahrir St, Cairo, Egypt 11511", phone: "+20 100 123 4567" },
  tracking: "DC-TRK-20250515-042",
  carrier: "FedEx Economy",
  weight: "0.45 kg",
  dimensions: "15 × 10 × 8 cm",
  items: ["Hyaluronic Serum 2% × 2", "Retinol Night Cream × 1"],
};

export default function AdminShippingLabels() {
  return (
    <div className="admin-page" style={{ maxWidth: 860 }}>
      <div className="admin-page__header">
        <div>
          <Link to="/admin/orders" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6366f1", textDecoration: "none", marginBottom: 8, fontWeight: 600 }}>
            <ChevronLeft size={14} /> Back to Orders
          </Link>
          <h1 className="admin-page__title">Shipping Label</h1>
          <p className="admin-page__subtitle">Generate and print shipping labels for orders.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={btnOutline}><Download size={14} /> Download PDF</button>
          <button style={btnSolid} onClick={() => window.print()}><Printer size={14} /> Print Label</button>
        </div>
      </div>

      {/* Label Preview */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
        <div>
          <div id="shipping-label" style={{ background: "#fff", border: "2px solid #1e1e2d", borderRadius: 12, padding: 32, fontFamily: "monospace" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "2px solid #1e1e2d", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1e1e2d", letterSpacing: "-0.5px" }}>DermaCare</div>
                <div style={{ fontSize: 11, color: "#71717a", marginTop: 2 }}>Skincare Fulfilled by DermaCare</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#6366f1" }}>{LABEL.carrier}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#1e1e2d", marginTop: 4 }}>{LABEL.order_ref}</div>
              </div>
            </div>

            {/* From / To */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
              <div>
                <div style={secLabel}>FROM</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1e1e2d" }}>{LABEL.from.name}</div>
                <div style={{ fontSize: 12, color: "#52525b", marginTop: 4, lineHeight: 1.6 }}>{LABEL.from.address}</div>
              </div>
              <div>
                <div style={secLabel}>TO</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1e1e2d" }}>{LABEL.to.name}</div>
                <div style={{ fontSize: 13, color: "#52525b", marginTop: 4, lineHeight: 1.6 }}>{LABEL.to.address}</div>
                <div style={{ fontSize: 12, color: "#71717a" }}>{LABEL.to.phone}</div>
              </div>
            </div>

            {/* Barcode */}
            <div style={{ textAlign: "center", padding: "20px 0", borderTop: "1px dashed #e4e4e7", borderBottom: "1px dashed #e4e4e7", marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 2, marginBottom: 8 }}>
                {Array.from({ length: 40 }, (_, i) => (
                  <div key={i} style={{ width: i % 3 === 0 ? 4 : 2, height: i % 5 === 0 ? 48 : 36, background: "#1e1e2d", borderRadius: 1 }} />
                ))}
              </div>
              <div style={{ fontSize: 11, color: "#52525b", letterSpacing: "0.1em" }}>{LABEL.tracking}</div>
            </div>

            {/* Details */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[["Weight", LABEL.weight], ["Dimensions", LABEL.dimensions], ["Items", LABEL.items.length + " products"]].map(([k, v]) => (
                <div key={k} style={{ background: "#f8f9fc", borderRadius: 8, padding: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "#a1a1aa", fontWeight: 700, textTransform: "uppercase" }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1e1e2d", marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="admin-card">
            <h3 className="admin-card__title"><Package size={14} style={{ marginRight: 6 }} />Package Contents</h3>
            {LABEL.items.map((item, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: i < LABEL.items.length - 1 ? "1px solid #f0f0f5" : "none", fontSize: 13, color: "#374151" }}>
                {item}
              </div>
            ))}
          </div>

          <div className="admin-card">
            <h3 className="admin-card__title"><MapPin size={14} style={{ marginRight: 6 }} />Tracking</h3>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#6366f1", wordBreak: "break-all", fontWeight: 700 }}>{LABEL.tracking}</div>
            <button style={{ ...btnOutline, marginTop: 12, width: "100%", justifyContent: "center" }}>Copy Tracking #</button>
          </div>

          <div className="admin-card">
            <h3 className="admin-card__title">Quick Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button style={{ ...btnSolid, justifyContent: "center" }}>Mark as Shipped</button>
              <button style={{ ...btnOutline, justifyContent: "center" }}>Notify Customer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const secLabel = { fontSize: 10, fontWeight: 800, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 };
const btnSolid = { padding: "9px 16px", borderRadius: 8, border: "none", background: "#1e1e2d", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };
const btnOutline = { padding: "8px 14px", borderRadius: 8, border: "1px solid #e4e4e7", background: "#fff", color: "#1e1e2d", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 };
