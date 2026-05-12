import React from "react";
import { Link } from "react-router";

export default function OrderCard({
  orderId,
  orderRef,
  status,
  subtotal,
  tax,
  shipping,
  total,
  createdAt,
  amount,
  paymentStatus,
}) {
  return (
    <div className="border border-base-300 rounded-2xl p-5 bg-base-200/40 hover:bg-base-200/60 transition shadow-sm mb-10">
      {/* TOP */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* LEFT */}
        <div>
          <p className="font-semibold text-base-content">Order #{orderId}</p>
          <p className="text-xs text-base-content/50">
            {orderRef.slice(0, 15)}
          </p>
        </div>

        {/* STATUS */}
        <span className="badge badge-warning badge-sm capitalize">
          {status}
        </span>
      </div>

      {/* MIDDLE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
        <div>
          <p className="text-base-content/50 text-xs">Date</p>
          <p>{new Date(createdAt).toLocaleDateString()}</p>
        </div>

        <div>
          <p className="text-base-content/50 text-xs">Total</p>
          <p className="font-semibold">${total}</p>
        </div>

        <div>
          <p className="text-base-content/50 text-xs">Payment</p>
          <p>${amount}</p>
          <span className="text-xs text-warning">{paymentStatus}</span>
        </div>

        <div>
          <p className="text-base-content/50 text-xs">Shipping</p>
          <p>${shipping}</p>
        </div>
      </div>

      {/* BREAKDOWN */}
      <div className="mt-4 text-xs text-base-content/60 border-t border-base-300 pt-3 flex flex-wrap gap-4">
        <span>Subtotal: ${subtotal}</span>
        <span>Tax: ${tax}</span>
      </div>

      {/* ACTION */}
      <div className="mt-4 flex justify-end">
        <Link
          to={`/orders/${orderId}`}
          className="btn btn-sm rounded-xl border-base-300 hover:bg-neutral hover:text-neutral-content"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
