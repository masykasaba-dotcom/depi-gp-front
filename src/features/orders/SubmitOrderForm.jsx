import React from "react";
import { Link } from "react-router";
import { ArrowRight, Truck } from "lucide-react";

export default function SubmitOrderForm({ cartProductLength, totalPrice }) {
  const isFreeShipping = totalPrice >= 150;
  const shippingCost = isFreeShipping ? 0 : 15;
  const grandTotal = totalPrice + shippingCost;

  return (
    <div className="bg-white rounded-2xl border border-[#E8E4DE] p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="font-display-lg text-[18px] text-[#06373A] leading-tight mb-6">
          Order Summary
        </h3>

        {/* Breakdown */}
        <div className="space-y-4 font-body-md text-[13px] text-on-secondary-container">
          <div className="flex justify-between">
            <span className="text-[#555a5b]">Subtotal</span>
            <span className="font-semibold text-[#06373A] tabular-nums">${totalPrice}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#555a5b]">Shipping</span>
            <span className="font-semibold text-[#06373A]">
              {totalPrice === 0 ? "—" : isFreeShipping ? "Free" : `$${shippingCost}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#555a5b]">Taxes</span>
            <span className="font-semibold text-[#06373A]">Calculated at checkout</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E8E4DE] my-6" />

        {/* Total */}
        <div className="flex justify-between items-end mb-8">
          <span className="font-display-lg text-[16px] text-[#06373A] leading-none">Total</span>
          <span className="font-display-lg text-[22px] text-[#06373A] leading-none tracking-tight tabular-nums">
            ${grandTotal}
          </span>
        </div>

        {/* Checkout CTA */}
        <Link
          to={cartProductLength > 0 ? "/checkout" : "#"}
          className={`w-full h-12 flex items-center justify-center gap-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-colors ${
            cartProductLength > 0
              ? "bg-[#032b26] text-white hover:bg-[#06373A]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <span>Checkout</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Complimentary shipping guarantee */}
      <div className="mt-6 bg-[#FAF9F6] border border-[#E8E4DE]/50 rounded-xl p-4 flex items-start gap-3">
        <Truck size={18} className="text-[#06373A] shrink-0 mt-0.5" />
        <p className="font-body-md text-[11px] leading-relaxed text-[#555a5b]">
          Complimentary shipping on orders over $150. Returns accepted within 30 days.
        </p>
      </div>
    </div>
  );
}
