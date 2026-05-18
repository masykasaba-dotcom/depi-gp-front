import { use } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";
import CartProduct from "../features/cart/CartProduct";
import SubmitOrderForm from "../features/orders/SubmitOrderForm";
import RecommendationsProducts from "../features/products/RecommendationsProducts";

export default function Cart() {
  const { cartProducts, totalPrice } = use(CartContext);

  return (
    <section className="bg-[#FAF9F6] min-h-screen py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="font-display-lg text-[36px] md:text-[48px] text-[#06373A] leading-tight">
            Your Bag
          </h1>
        </header>

        {cartProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E8E4DE] rounded-2xl p-8 mb-16">
            <p className="font-body-md text-[16px] text-on-secondary-container mb-6">
              There are no products in your bag yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#032b26] text-white rounded-lg font-body-md text-[13px] font-medium hover:bg-[#06373A] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
            {/* Products List (Left side) */}
            <div className="lg:col-span-8 bg-white border border-[#E8E4DE] rounded-2xl p-6 lg:p-8 shadow-sm">
              <div className="divide-y divide-[#E8E4DE]/50">
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
            </div>

            {/* Summary Sidebar (Right side) */}
            <div className="lg:col-span-4 sticky top-24">
              <SubmitOrderForm
                cartProductLength={cartProducts.length}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        )}

        {/* Recommended section */}
        <div className="border-t border-[#E8E4DE] pt-16">
          <div className="flex items-center justify-between gap-4 mb-10">
            <h2 className="font-display-lg text-[22px] text-[#06373A]">
              Recommended for You
            </h2>
            <Link
              to="/products"
              className="text-xs font-semibold uppercase tracking-wider text-[#06373A] hover:underline underline-offset-4"
            >
              Shop All
            </Link>
          </div>
          <RecommendationsProducts />
        </div>
      </div>
    </section>
  );
}
