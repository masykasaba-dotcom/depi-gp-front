import { Link } from "react-router";
import { memo } from "react";
import { use } from "react";
import { CartContext } from "../../context/CartContext";
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
  console.log(maxPrice);
  console.log(minPrice);
  console.log("50" > "40");
  let selctedVariant;
  if (
    (maxPrice === "" || maxPrice === undefined) &&
    (minPrice === "" || minPrice === undefined)
  ) {
    selctedVariant = variantOne;
  }

  if (variantOne.price >= minPrice && variantOne.price <= maxPrice) {
    selctedVariant = variantOne;
  }

  if (variantTwo.price >= minPrice && variantTwo.price <= maxPrice) {
    selctedVariant = variantTwo;
  }

  if (variantOne.price >= minPrice && maxPrice == "") {
    selctedVariant = variantOne;
  }

  if (variantTwo.price >= minPrice && maxPrice == "") {
    selctedVariant = variantTwo;
  }

  const addProduct = useAddProduct(
    selctedVariant.variant_id,
    selctedVariant.stock,
  );
  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-low mb-6 border linen-border transition-all duration-500 hover:border-outline">
        <Link to={`/products/${id}`} className="block w-full h-full">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        
        {/* Optional: Add a badge if there's data for it, or just a placeholder for "NEW" if appropriate */}
        {/* <div className="absolute top-4 left-4">
          <span className="bg-primary text-on-primary font-label-caps text-[10px] px-2 py-1 tracking-widest">NEW</span>
        </div> */}

        <button
          onClick={(event) => {
            event.preventDefault();
            addProduct(event);
          }}
          disabled={selctedVariant.stock === 0}
          className="absolute bottom-0 left-0 w-full bg-primary text-on-primary py-4 font-label-caps text-[12px] tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50 uppercase cursor-pointer"
        >
          {selctedVariant.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

      <Link to={`/products/${id}`} className="flex flex-col gap-1">
        <h4 className="font-headline-sm text-[18px] text-primary uppercase mb-1 leading-tight">
          {name}
        </h4>
        <p className="font-body-md text-on-surface-variant text-sm mb-3 line-clamp-1">
          {description}
        </p>
        <p className="font-label-caps text-primary font-semibold">
          ${selctedVariant.price}
        </p>
      </Link>
    </div>
  );
});

