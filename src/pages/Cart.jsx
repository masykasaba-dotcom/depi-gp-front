import { use } from "react";
import { Link } from "react-router";
import { CartContext } from "../store/CartContext";
import CartProduct from "../components/CartProduct";
import SubmitOrderForm from "../components/SubmitOrderForm";

// Mock data to scaffold the UI according to API "get customer cart" needs

export default function Cart() {
  const { cartProducts, totalPrice } = use(CartContext);

  return (
    <section className="bg-base-100 min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <header className="mb-8">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-primary">
            Shopping bag
          </p>
          <h1 className="font-serif text-3xl font-light text-base-content md:text-4xl">
            Cart
          </h1>
          <p className="mt-2 text-base-content/70">
            Review your selection before proceeding.
          </p>
        </header>
        {cartProducts.length === 0 && (
          <p>there is no prosuct in your cart yet</p>
        )}
        <div className="mt-10 divide-y divide-base-300    overflow-hidden ">
          {cartProducts.map((item) => (
            <CartProduct
              key={item.cart_item_id}
              id={item.cart_item_id}
              image={item.primary_image}
              name={item.product_name}
              size={item.variant_size}
              quantity={item.quantity}
              productTotalPrice={item.item_total}
              stock={item.stock}
              variantId={item.variant_id}
            />
          ))}
        </div>

        <SubmitOrderForm
          cartProductLength={cartProducts.length}
          totalPrice={totalPrice}
        />
      </div>
    </section>
  );
}
