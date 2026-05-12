import axios from "axios";
import React from "react";
import { use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../store/AuthContext";
import { useActionState } from "react";
import { CartContext } from "../store/CartContext";
import useMakeOrder from "../hooks/useMakeOrder";

export default function SubmitOrderForm({ cartProductLength, totalPrice }) {
  const { formAction, pending } = useMakeOrder();
  return (
    <form className="mt-10 flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-200/50 p-6 md:flex-row md:items-start md:justify-between shadow-sm">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
          Order Summary
        </p>
        <p className="mt-2 text-sm text-base-content/70">
          Shipping and taxes calculated at next step.
        </p>
      </div>
      <div className="text-right w-full md:w-auto">
        <div className="border-b border-base-300 pb-4 mb-4">
          <p className="text-sm text-base-content/70 flex justify-between md:justify-end gap-16">
            Subtotal
            <span className="font-medium tabular-nums text-base-content">
              {totalPrice}
            </span>
          </p>
        </div>
        {/* The user specifically asked NOT to add the checkout page, so we only provide the UI button */}
        <button
          disabled={cartProductLength === 0 || pending}
          formAction={formAction}
          className="btn btn-neutral w-full md:w-auto min-w-[200px]rounded-xl text-xs font-semibold uppercase tracking-[0.2em]"
        >
          {cartProductLength === 0 ? "there is no product" : "Procced"}
        </button>
        <Link
          to="/products"
          className="mt-4 block text-center text-sm text-base-content/60 hover:text-primary transition no-underline md:text-right underline-offset-4"
        >
          Continue shopping
        </Link>
      </div>
    </form>
  );
}
