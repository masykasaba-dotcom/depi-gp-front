import React from "react";
import { Link } from "react-router";

export default function OrderCard({ order }) {
  const { order_id, order_ref, status, total, created_at, items } = order;

  // Derive status UI
  const isDelivered = status?.toLowerCase() === "delivered";
  const statusColor = isDelivered ? "bg-[#E8EFF0] text-[#06373A]" : "bg-[#FAF9F6] text-[#555a5b]";
  const statusIcon = isDelivered ? "●" : "⏳";

  // Derive item info
  const firstItem = items?.[0];
  const hasMultipleItems = items?.length > 1;

  return (
    <div className="border border-[#E8E4DE] rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-[#FAF9F6]/50 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E4DE]">
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-[#06373A] mb-1">
            ORDER #{order_ref || order_id}
          </p>
          <p className="text-[12px] text-[#555a5b]">
            Placed on {new Date(created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] font-bold tracking-wider uppercase text-[#555a5b] mb-0.5">Total</p>
            <p className="text-[14px] font-semibold text-[#06373A]">${Number(total).toFixed(2)}</p>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-[#E8E4DE] flex items-center gap-1.5 ${statusColor}`}>
            <span>{statusIcon}</span>
            {status}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-center gap-6 mb-6">
          {/* Generic Order Icon instead of Image since items aren't returned by GET /orders */}
          <div className="w-16 h-16 bg-[#E8EFF0] text-[#06373A] rounded-xl flex items-center justify-center shrink-0 border border-[#dce6e7] text-2xl shadow-sm">
            📦
          </div>
          {/* Details */}
          <div>
            <h4 className="font-display-lg text-[18px] text-[#06373A] mb-1">
              Order Details
            </h4>
            <p className="text-[13px] text-[#555a5b]">
              Subtotal: ${Number(order.subtotal).toFixed(2)} · Shipping: ${Number(order.shipping).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E4DE]/50">
          <Link
            to={`/orders/${order_id}`}
            className="px-6 py-2.5 rounded-xl border border-[#E8E4DE] text-[12px] font-bold tracking-widest uppercase text-[#06373A] hover:bg-[#FAF9F6] transition-colors"
          >
            View Details
          </Link>
          {isDelivered ? (
            <button className="px-6 py-2.5 rounded-xl bg-[#032b26] text-[12px] font-bold tracking-widest uppercase text-white hover:bg-[#06373A] transition-colors shadow-sm">
              Buy Again
            </button>
          ) : (
            <Link
              to={`/orders/${order_id}/track`}
              className="px-6 py-2.5 rounded-xl border border-[#E8E4DE] text-[12px] font-bold tracking-widest uppercase text-[#06373A] hover:bg-[#FAF9F6] transition-colors bg-[#FAF9F6]"
            >
              Track Order
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
