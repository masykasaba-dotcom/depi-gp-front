import { Link } from "react-router";
import { memo } from "react";
import useAddProduct from "../../hooks/useAddProduct";

export default memo(function Product({
  id,
  image,
  name,
  description,
  variantOne,
  variantTwo,
  maxPrice,
  minPrice,
}) {
  let selctedVariant;
  if (
    (maxPrice === "" || maxPrice === undefined) &&
    (minPrice === "" || minPrice === undefined)
  ) {
    selctedVariant = variantOne;
  }

  if (variantOne?.price >= minPrice && variantOne?.price <= maxPrice) {
    selctedVariant = variantOne;
  }

  if (variantTwo?.price >= minPrice && variantTwo?.price <= maxPrice) {
    selctedVariant = variantTwo;
  }

  if (variantOne?.price >= minPrice && maxPrice == "") {
    selctedVariant = variantOne;
  }

  if (variantTwo?.price >= minPrice && maxPrice == "") {
    selctedVariant = variantTwo;
  }

  // Fallback to variantOne if no selection was made
  if (!selctedVariant) {
    selctedVariant = variantOne;
  }

  const addProduct = useAddProduct(
    selctedVariant?.variant_id,
    selctedVariant?.stock,
  );

  return (
    <div className="group flex flex-col cursor-pointer">
      {/* ─── Image Container ─── */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f7f9] mb-4 rounded-xl transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(6,55,58,0.08)]">
        <Link to={`/products/${id}`} className="block w-full h-full">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        
        {/* Soft overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Add to Cart Button (Slides up smoothly) */}
        <button
          onClick={(event) => {
            event.preventDefault();
            addProduct(event);
          }}
          disabled={selctedVariant?.stock === 0}
          className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md text-[#06373A] py-3.5 font-sans font-bold text-[11px] uppercase tracking-[0.2em] translate-y-full group-hover:translate-y-0 transition-transform duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white z-10"
        >
          {selctedVariant?.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

      {/* ─── Text Content ─── */}
      <Link to={`/products/${id}`} className="flex flex-col gap-1.5 px-1">
        <div className="flex justify-between items-start gap-2">
          <h4 className="font-serif text-[17px] text-[#06373A] leading-tight flex-1">
            {name}
          </h4>
          <p className="font-sans text-[13px] text-[#06373A] font-semibold">
            ${selctedVariant?.price}
          </p>
        </div>
        <p className="font-sans text-[13px] text-[#555a5b] line-clamp-1 opacity-80">
          {description}
        </p>
      </Link>
    </div>
  );
});

