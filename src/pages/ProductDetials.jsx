import { use } from "react";
import useProductDetials from "../hooks/useProductDetials";
import { CartContext } from "../store/CartContext";
import ReviewsSection from "../components/ReviewsSection";
import { Link } from "react-router";
import useAddProduct from "../hooks/useAddProduct";

export default function ProductDetials() {
  const {
    productDetials,
    selectedVariant,
    setSelectedVariant,
    isLoading,
    isError,
  } = useProductDetials();
  const addProduct = useAddProduct(
    selectedVariant.variant_id,
  );
  return (
    <section className="bg-base-100 py-12">
      {isError && <EmptyProductDetails />}
      {isLoading && <ProductDetialsSkeleton />}
      {!isLoading && !isError && (
        <div className="grid items-start gap-8 px-4 py-8 md:px-8 lg:grid-cols-7 lg:gap-12 max-w-7xl mx-auto">
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm lg:col-span-4 flex items-center justify-center p-5 sm:p-6">
            {/* Category badge */}
            <span className="absolute top-4 left-4 bg-black text-white text-[10px] sm:text-xs px-3 py-1 z-10 rounded-full tracking-wide">
              {productDetials?.category?.category_name}
            </span>

            {/* Image */}
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
              <img
                src={productDetials?.images[0].image_url}
                alt={productDetials?.product_name}
                className="w-full h-auto object-contain transition duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-3 flex flex-col justify-center h-full">
            {/* Top */}
            <div>
              {/* Title + Price */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
                  {productDetials?.product_name}
                </h1>

                <span className="bg-gray-100 text-gray-900 text-sm font-semibold px-3 py-1 rounded-full w-fit">
                  ${selectedVariant?.price}
                </span>
              </div>

              {/* Category description */}
              <p className="text-xs text-gray-400 mb-3">
                {productDetials?.category?.description}
              </p>

              {/* Description */}
              <p className="text-gray-500 text-sm sm:text-base mb-5 leading-relaxed">
                {productDetials?.description}
              </p>

              {/* Stock status */}
              <p
                className={`text-xs font-medium mb-4 ${
                  selectedVariant?.stock <= selectedVariant?.low_stock_threshold
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {selectedVariant?.stock <= selectedVariant?.low_stock_threshold
                  ? `⚠ Only ${selectedVariant?.stock} left`
                  : "✔ In Stock"}
              </p>

              {/* Volume Selector */}
              <div className="mb-6">
                <p className="mb-2 text-xs text-gray-500 uppercase tracking-widest">
                  Select Volume
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {productDetials?.variants.map((variant) => {
                    const isActive =
                      variant.variant_id === selectedVariant?.variant_id;

                    return (
                      <button
                        key={variant.variant_id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-5 py-2 text-sm rounded-lg transition ${
                          isActive
                            ? "bg-black text-white border-2 border-black"
                            : "border border-gray-300 text-gray-700 hover:border-black"
                        }`}
                      >
                        {variant.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div>
              {/* CTA */}
              <button
                onClick={selectedVariant?.stock && addProduct}
                disabled={selectedVariant?.stock === 0}
                className="w-full py-3 rounded-xl bg-black text-white text-sm font-semibold tracking-wide hover:opacity-90 active:scale-95 transition mb-4 disabled:opacity-50"
              >
                {selectedVariant?.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>

              {/* Secondary actions */}
              <div className="flex gap-2 sm:gap-3 mb-5">
                <button className="flex-1 py-2 border border-gray-300 rounded-lg text-sm hover:border-black transition">
                  ♡ Wishlist
                </button>

                <button className="flex-1 py-2 border border-gray-300 rounded-lg text-sm hover:border-black transition">
                  Share
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {["VEGAN", "CLINICAL GRADE", "CRUELTY FREE"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 font-medium hover:bg-gray-200 transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REVIEWS SECTION */}
      {!isError && !isLoading && <ReviewsSection />}

      {/* RECOMMENDED SIMILAR PRODUCTS BY INGREDIENTS */}
      {/* <div className="mt-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-xl font-medium text-base-content mb-6 border-b border-base-300 pb-2">
          Highly recommended with this product
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Gentle Cleanser", label: "Step 1" },
            { name: "Exfoliating Toner", label: "Step 2" },
            { name: "Hydra Barrier", label: "Step 4" }
          ].map((item, i) => (
             <div key={i} className="rounded-xl border border-base-300 bg-base-200/30 p-4 text-center hover:bg-base-200/60 transition cursor-pointer">
                <div className="h-24 w-full bg-base-300 rounded-lg mb-3 object-cover flex items-center justify-center text-xs text-base-content/40">Image Placeholder</div>
                <p className="text-xs uppercase text-primary font-semibold tracking-wider mb-1">{item.label}</p>
                <p className="text-sm font-medium text-base-content">{item.name}</p>
             </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}

function ProductDetialsSkeleton() {
  return (
    <div className="grid items-start gap-8 px-4 py-8 md:px-8 lg:grid-cols-7 lg:gap-12 max-w-7xl mx-auto animate-pulse">
      {/* Image Skeleton */}
      <div className="lg:col-span-4 bg-white rounded-3xl shadow-md p-6 flex items-center justify-center">
        <div className="skeleton w-full max-w-md h-64 sm:h-80 md:h-96 rounded-xl"></div>
      </div>

      {/* Content Skeleton */}
      <div className="lg:col-span-3 flex flex-col gap-5">
        {/* Title + Price */}
        <div className="flex justify-between items-center gap-3">
          <div className="skeleton h-6 w-40 rounded"></div>
          <div className="skeleton h-6 w-20 rounded-full"></div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-full rounded"></div>
          <div className="skeleton h-4 w-5/6 rounded"></div>
          <div className="skeleton h-4 w-2/3 rounded"></div>
        </div>

        {/* Volume Selector */}
        <div className="flex gap-3 mt-2">
          <div className="skeleton h-10 w-20 rounded-lg"></div>
          <div className="skeleton h-10 w-20 rounded-lg"></div>
        </div>

        {/* Button */}
        <div className="skeleton h-12 w-full rounded-xl mt-2"></div>

        {/* Secondary Buttons */}
        <div className="flex gap-3">
          <div className="skeleton h-10 flex-1 rounded-lg"></div>
          <div className="skeleton h-10 flex-1 rounded-lg"></div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          <div className="skeleton h-6 w-16 rounded-full"></div>
          <div className="skeleton h-6 w-20 rounded-full"></div>
          <div className="skeleton h-6 w-24 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

function EmptyProductDetails() {
  return (
    <section className=" flex flex-col items-center justify-center px-2 text-center bg-base-100">
      {/* Illustration */}
      <div className="mb-6">
        <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full bg-base-200 flex items-center justify-center text-5xl">
          📦
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">Product Not Found</h1>

      {/* Description */}
      <p className="text-sm sm:text-base text-base-content/70 max-w-md mb-6">
        The product you are looking for doesn't exist or has been removed. Try
        browsing other products instead.
      </p>

      {/* OWN TAG */}
      <span className="px-3 py-1 text-xs rounded-full bg-warning/20 text-warning font-medium mb-6">
        own
      </span>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/products" className="btn btn-primary w-full sm:w-auto">
          Browse Products
        </Link>
      </div>
    </section>
  );
}
