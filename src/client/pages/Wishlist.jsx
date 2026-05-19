import React, { useContext } from "react";
import AccountLayout from "../layouts/AccountLayout";
import { useGetWishlist, useRemoveFromWishlist, useClearWishlist } from "../hooks/useWishlist";
import { CartContext } from "../contexts/CartContext";
import { toast } from "sonner";
import { Link } from "react-router";

export default function Wishlist() {
  const { data, isLoading, isError } = useGetWishlist();
  const { mutate: remove, isPending: isRemoving } = useRemoveFromWishlist();
  const { mutate: clear, isPending: isClearing } = useClearWishlist();
  const { handleAddProductToCart } = useContext(CartContext);

  const items = data?.data || [];

  const handleRemove = (productId) => {
    remove(productId, {
      onSuccess: () => toast.success("Item removed from wishlist"),
      onError: () => toast.error("Failed to remove item")
    });
  };

  const handleAddToCart = (variantId) => {
    handleAddProductToCart({ variant_id: variantId, quantity: 1 });
  };

  const handleMoveAllToBag = () => {
    if (items.length === 0) return;
    
    // Add all items to bag sequentially
    const promises = items.map(item => {
      const defaultVariant = item.product.variants?.[0];
      if (defaultVariant) {
        return handleAddProductToCart({ variant_id: defaultVariant.variant_id, quantity: 1 });
      }
      return Promise.resolve();
    });

    toast.promise(Promise.all(promises), {
      loading: 'Moving items to bag...',
      success: () => {
        clear();
        return 'All items moved to bag!';
      },
      error: 'Failed to move some items'
    });
  };

  if (isLoading) {
    return (
      <AccountLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-[#EAEAEA] rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-[#EAEAEA] rounded-xl" />
            ))}
          </div>
        </div>
      </AccountLayout>
    );
  }

  if (isError) {
    return (
      <AccountLayout>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          Failed to load wishlist
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display-lg text-[32px] text-[#06373A] mb-1">Your Wishlist</h2>
          <p className="font-body-md text-[14px] text-[#555a5b]">
            {items.length} item{items.length !== 1 && 's'} curated for your routine.
          </p>
        </div>
        {items.length > 0 && (
          <button 
            onClick={handleMoveAllToBag}
            disabled={isClearing}
            className="flex items-center gap-2 border border-[#06373A] text-[#06373A] px-4 py-2 rounded-lg hover:bg-[#06373A]/5 transition-colors text-sm font-semibold disabled:opacity-50"
          >
            🛍️ Move All to Bag
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E4DE]">
          <p className="text-[#555a5b] mb-4">Your wishlist is currently empty.</p>
          <Link to="/products" className="text-[#06373A] font-semibold hover:underline">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const product = item.product;
            const defaultVariant = product.variants?.[0];
            const price = defaultVariant?.price || 0;
            const imageUrl = product.images?.[0]?.image_url || "https://placehold.co/400x500?text=Product";

            return (
              <div key={item.wishlist_item_id} className="bg-white border border-[#E8E4DE] rounded-xl p-4 flex flex-col relative group">
                <button 
                  onClick={() => handleRemove(product.product_id)}
                  disabled={isRemoving}
                  className="absolute top-6 right-6 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white transition-all z-10 shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  ✕
                </button>
                
                <div className="aspect-[4/5] bg-[#F5F5F5] rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt={product.product_name} 
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display-lg text-[18px] text-[#06373A] flex-1 pr-4">
                    {product.product_name}
                  </h3>
                  <span className="font-bold text-[#06373A]">${price}</span>
                </div>
                
                <p className="font-body-md text-[12px] text-[#555a5b] mb-6 line-clamp-2 flex-1">
                  {product.description || "Active clinical formulation"}
                </p>
                
                <button 
                  onClick={() => handleAddToCart(defaultVariant?.variant_id)}
                  disabled={!defaultVariant}
                  className="w-full py-3 bg-[#032b26] text-white rounded-lg font-semibold text-[13px] tracking-wider hover:bg-[#06373A] transition-colors disabled:opacity-50"
                >
                  Add to Bag
                </button>
              </div>
            );
          })}
        </div>
      )}
    </AccountLayout>
  );
}
