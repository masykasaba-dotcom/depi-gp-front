import React, { memo , useRef } from "react";
import { use } from "react";
import { CartContext } from "../store/CartContext";
import { Link } from "react-router";
import useUpdateQuantity from "../hooks/useUpdateQuantity";
import ConfirmModal from "./ConfirmModal";

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
  const {
    downQuantityAction,
    downQuantityPending,
    upQuantityAction,
    upQuantityPending,
    optimisticValue
  } = useUpdateQuantity(id, quantity, stock);
  const productId = variantId % 2 === 0 ? variantId / 2 : (variantId + 1) / 2;
  const modalRef = useRef()

  async function confrimRemoveProductFromCart(){
    await handleRemoveProductFromCart(id)
    modalRef.current.close()
  }
  function startDeleteItem(){
    modalRef.current.showModal()
  }
  return (
    <>
      <ConfirmModal ref={modalRef} onRemove={confrimRemoveProductFromCart} />
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center hover:bg-base-200/50 bg-base-300 transition border border-base-300 mb-5  rounded-2xl">
        <Link
          to={`/products/${productId}`}
          className="h-28 w-full shrink-0 overflow-hidden rounded-xl bg-base-200 sm:h-24 sm:w-24 border border-base-300"
        >
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </Link>

        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-lg font-semibold text-base-content">
            {name}
          </h2>

          <p className="mt-1 text-sm text-base-content/70">Variant: {size}</p>

          <form className="mt-3 flex border border-base-300 rounded-lg w-fit items-center bg-base-100">
            <button
              formAction={downQuantityAction}
              disabled={upQuantityPending || downQuantityPending}
              className="px-3 md:py-1 text-base-content/70 hover:text-primary transition font-bold"
            >
              -
            </button>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="quantity" value={quantity} />
            <span className="text-xs uppercase tracking-wide text-base-content px-2 font-medium">
              Qty {optimisticValue}
            </span>

            <button
              formAction={upQuantityAction}
              disabled={upQuantityPending || downQuantityPending}
              className="px-3 md:py-1 text-base-content/70 transition font-bold "
            >
              +
            </button>
          </form>
        </div>

        <div className="text-right sm:text-right flex justify-between sm:block mt-2 sm:mt-0">
          <p className="font-medium tabular-nums text-base-content text-lg">
            ${productTotalPrice}
          </p>

          <button
            type="button"
            className="mt-2 text-sm text-secondary underline decoration-base-300 underline-offset-4 hover:text-error transition cursor-pointer"
            onClick={startDeleteItem}
          >
            Remove item
          </button>
        </div>
      </div>
    </>
  );
});
