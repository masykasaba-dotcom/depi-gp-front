import { useState } from "react";
import { Link } from "react-router";
import useAddProduct from "../hooks/useAddProduct";

export default function RecommendationsProduct({ product }) {
  
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0],
  );
  const addProduct = useAddProduct(selectedVariant.variant_id,selectedVariant.selectedVariant)
  const isOutOfStock = selectedVariant?.stock === 0;
  const isLowStock =
    selectedVariant?.stock > 0 &&
    selectedVariant?.stock <= selectedVariant?.low_stock_threshold;
  function handleChangeVariant(event,variant){
    event.preventDefault()
    setSelectedVariant(prevState => variant)
  }
  return (
    <Link to={`/products/${product?.product_id}`} className="rounded-2xl border border-base-300 bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="h-48 bg-base-200 overflow-hidden">
        <img
          src={product?.primary_image}
          alt={product?.product_name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        {/* Category */}
        <span className="text-xs text-base-content/50 uppercase tracking-wide">
          {product?.category?.category_name}
        </span>

        {/* Name */}
        <h3 className="text-lg font-semibold text-base-content mt-1">
          {product?.product_name}
        </h3>

        {/* Description */}
        <p className="text-sm text-base-content/60 mt-1">
          {product?.description}
        </p>

        {/* Variants */}
        <div className="flex gap-2 mt-3">
          {product?.variants?.map((variant) => (
            <button
              key={variant.variant_id}
              onClick={(event) => handleChangeVariant(event,variant)}
              className={`px-3 py-1 text-xs rounded-full border transition ${
                selectedVariant?.variant_id === variant.variant_id
                  ? "border-primary text-primary"
                  : "border-base-300 text-base-content/60 hover:border-base-content"
              }`}
            >
              {variant.size}
            </button>
          ))}
        </div>

        {/* Price + Stock */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-semibold text-base-content">
            ${selectedVariant?.price}
          </p>

          <div className="text-xs">
            {isOutOfStock && (
              <span className="text-red-500 font-medium">Out of stock</span>
            )}
            {isLowStock && (
              <span className="text-orange-500 font-medium">Low stock</span>
            )}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={(event) => addProduct(event)}
          disabled={isOutOfStock}
          className={`w-full mt-4 py-2 rounded-lg text-sm font-medium transition ${
            isOutOfStock
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-primary text-white hover:opacity-90"
          }`}
        >
          {isOutOfStock ? "Unavailable" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}
