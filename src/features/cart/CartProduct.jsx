import React, { memo, useRef, use } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";
import useUpdateQuantity from "../../hooks/useUpdateQuantity";
import ConfirmModal from "../../components/ui/ConfirmModal";
import axios from "axios";
import apiUrl from "../../lib/apiUrl";
import { toast } from "sonner";
import { Heart } from "lucide-react";

export default memo(function CartProduct({
  id,
  image,
  name,
  size,
  quantity,
  productTotalPrice,
  stock,
  variantId,
}) {
  const { handleRemoveProductFromCart } = use(CartContext);
  const { token } = use(AuthContext);
  const {
    downQuantityAction,
    downQuantityPending,
    upQuantityAction,
    upQuantityPending,
    optimisticValue
  } = useUpdateQuantity(id, quantity, stock);
  
  // Calculate a reasonable product ID to link back to details
  const productId = variantId % 2 === 0 ? variantId / 2 : (variantId + 1) / 2;
  const modalRef = useRef();

  async function confirmRemoveProductFromCart() {
    await handleRemoveProductFromCart(id);
    modalRef.current.close();
  }

  function startDeleteItem() {
    modalRef.current.showModal();
  }

  async function handleMoveToWishlist() {
    try {
      // 1. Add to wishlist
      await axios.post(
        `${apiUrl}wishlist`,
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // 2. Remove from cart
      await handleRemoveProductFromCart(id);
      toast.success("Moved to wishlist");
    } catch (err) {
      toast.error("Could not move item to wishlist");
    }
  }

  return (
    <>
      <ConfirmModal ref={modalRef} onRemove={confirmRemoveProductFromCart} />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8 border-b border-[#E8E4DE] bg-white group">
        {/* Left Side: Image & Content Details */}
        <div className="flex items-start gap-5 flex-1 min-w-0">
          <Link
            to={`/products/${productId}`}
            className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-lg bg-[#FAF9F6] border border-[#E8E4DE] flex items-center justify-center p-2"
          >
            <img src={image} alt={name} className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
          </Link>

          {/* Details */}
          <div className="flex-1 min-w-0 flex flex-col justify-between h-auto sm:min-h-[100px]">
            <div>
              <h3 className="font-display-lg text-[16px] font-semibold text-[#06373A] hover:text-[#032b26] transition-colors leading-snug">
                <Link to={`/products/${productId}`}>{name}</Link>
              </h3>
              <p className="font-body-md text-[12px] text-on-secondary-container mt-1">
                {size}
              </p>
            </div>

            {/* Quantity Selector inside cart item */}
            <div className="mt-4 flex items-center gap-1 border border-[#E8E4DE] rounded-[4px] w-fit bg-white h-8">
              <button
                formAction={downQuantityAction}
                disabled={upQuantityPending || downQuantityPending || optimisticValue <= 1}
                className="w-8 h-full flex items-center justify-center text-[#06373A] hover:bg-[#FAF9F6] disabled:opacity-30 disabled:hover:bg-transparent font-medium transition-colors text-sm"
              >
                —
              </button>
              <span className="w-8 text-center text-xs font-semibold text-[#06373A]">
                {optimisticValue}
              </span>
              <button
                formAction={upQuantityAction}
                disabled={upQuantityPending || downQuantityPending || optimisticValue >= stock}
                className="w-8 h-full flex items-center justify-center text-[#06373A] hover:bg-[#FAF9F6] disabled:opacity-30 disabled:hover:bg-transparent font-medium transition-colors text-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Price & Move / Remove Actions */}
        <div className="w-full sm:w-auto flex sm:flex-col justify-between sm:items-end gap-2 shrink-0 self-stretch sm:self-auto sm:text-right">
          <p className="font-display-lg text-[16px] font-semibold text-[#06373A] tabular-nums">
            ${productTotalPrice}
          </p>

          <div className="flex items-center gap-3 text-[11px] font-semibold tracking-wider uppercase text-on-secondary-container sm:mt-auto">
            <button
              type="button"
              onClick={handleMoveToWishlist}
              className="hover:text-[#06373A] transition underline underline-offset-4 cursor-pointer"
            >
              Move to Wishlist
            </button>
            <span className="opacity-30">|</span>
            <button
              type="button"
              onClick={startDeleteItem}
              className="hover:text-red-500 transition underline underline-offset-4 cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
