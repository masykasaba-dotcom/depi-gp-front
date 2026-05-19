import { Link } from "react-router";
import { memo } from "react";
import useAddProduct from "../../hooks/useAddProduct";
import { Heart } from "lucide-react";
import { useGetWishlist, useAddToWishlist, useRemoveFromWishlist } from "../../hooks/useWishlist";
import { toast } from "sonner";

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
  const { data: wishlistData } = useGetWishlist();
  const { mutate: addToWishlist, isPending: isAdding } = useAddToWishlist();
  const { mutate: removeFromWishlist, isPending: isRemoving } = useRemoveFromWishlist();
  
  const wishlistItems = wishlistData?.data || [];
  const isInWishlist = wishlistItems.some(item => item.product_id === id);

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

  // Dummy tags for UI until backend supports it
  const tags = ["Hydration", "All Skin Types"];

  return (
    <div className="group flex flex-col cursor-pointer bg-white border border-outline-variant/30 rounded-[12px] p-3 transition-all duration-300 hover:shadow-lg animate-fade-in-up">
      {/* ─── Image Container ─── */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f9fa] mb-4 rounded-[8px]">
        <Link to={`/products/${id}`} className="block w-full h-full p-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        
        {/* Heart Icon (Top Right) */}
        <button 
          onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation();
            if (isInWishlist) {
              removeFromWishlist(id, {
                onSuccess: () => toast.success("Removed from Wishlist")
              });
            } else {
              addToWishlist(id, {
                onSuccess: () => toast.success("Added to Wishlist")
              });
            }
          }}
          disabled={isAdding || isRemoving}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-outline hover:text-error transition-colors disabled:opacity-50"
        >
          <Heart size={16} strokeWidth={2} className={isInWishlist ? "fill-error text-error" : ""} />
        </button>

        {/* Bestseller Tag (Bottom Left) */}
        <div className="absolute bottom-3 left-3 bg-[#032b26] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-[4px]">
          BESTSELLER
        </div>
      </div>

      {/* ─── Text Content ─── */}
      <Link to={`/products/${id}`} className="flex flex-col gap-2 px-1 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h4 className="font-display-lg text-[18px] text-[#06373A] leading-tight flex-1">
            {name}
          </h4>
          <p className="font-body-md text-[16px] text-[#06373A] font-semibold">
            ${selctedVariant?.price}
          </p>
        </div>
        <p className="font-body-md text-[13px] text-on-secondary-container line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-white border border-outline-variant/50 rounded-full text-[10px] text-on-secondary-container tracking-wide">
              {tag}
            </span>
          ))}
        </div>
      </Link>

      {/* Add to Cart Button (Fixed at bottom) */}
      <button
        onClick={(event) => {
          event.preventDefault();
          addProduct(event);
        }}
        disabled={selctedVariant?.stock === 0}
        className="w-full mt-auto bg-white border border-[#032b26] text-[#032b26] rounded-[6px] py-3 font-body-md font-medium text-[14px] hover:bg-[#032b26] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {selctedVariant?.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
});

