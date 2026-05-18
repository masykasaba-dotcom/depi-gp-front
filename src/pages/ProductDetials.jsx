import { useState } from "react";
import useProductDetials from "../hooks/useProductDetials";
import { CartContext } from "../context/CartContext";
import ReviewsSection from "../features/products/ReviewsSection";
import { Link } from "react-router";
import useAddProduct from "../hooks/useAddProduct";
import { Star, Beaker, Droplet, Leaf, PlayCircle } from "lucide-react";

export default function ProductDetials() {
  const {
    productDetials,
    selectedVariant,
    setSelectedVariant,
    isLoading,
    isError,
  } = useProductDetials();
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const addProduct = useAddProduct(selectedVariant?.variant_id);

  return (
    <main className="bg-background min-h-screen">
      {isError && <EmptyProductDetails />}
      {isLoading && <ProductDetialsSkeleton />}
      {!isLoading && !isError && (
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 lg:py-24 animate-fade-in">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-3 mb-10 font-label-caps text-[10px] text-on-secondary-container tracking-widest uppercase animate-fade-in-up">
            <Link to="/products" className="hover:text-primary transition-colors">Shop</Link>
            <span className="text-outline-variant">/</span>
            <span className="text-outline-variant">{productDetials?.category?.category_name}</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary">{productDetials?.product_name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-16">
            {/* Left: Product Gallery */}
            <div className="lg:col-span-6 flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {/* Main Feature Image */}
              <div className="w-full aspect-[4/5] bg-[#f8f9fa] rounded-[8px] border border-outline-variant/20 overflow-hidden relative flex items-center justify-center p-8 md:p-16">
                {productDetials?.images && productDetials?.images.length > 0 ? (
                  <img
                    src={productDetials?.images[activeImageIndex]?.image_url || productDetials?.images[0].image_url}
                    alt={productDetials?.product_name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-outline font-label-caps">No image available</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {productDetials?.images && productDetials?.images.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                  {productDetials?.images?.map((img, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-[80px] h-[80px] flex-shrink-0 rounded-[8px] transition-all duration-300 bg-[#f8f9fa] cursor-pointer overflow-hidden border ${
                        activeImageIndex === index ? "border-[#032b26] opacity-100" : "border-outline-variant/30 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img.image_url}
                        alt={`Detail ${index}`}
                        className="w-full h-full object-contain p-2 mix-blend-multiply"
                      />
                    </button>
                  ))}
                  {/* Dummy video thumbnail to match design */}
                  <button className="w-[80px] h-[80px] flex-shrink-0 rounded-[8px] border border-outline-variant/30 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity bg-white">
                    <PlayCircle size={20} className="text-outline" />
                  </button>
                </div>
              )}
            </div>


            {/* Right: Product Details */}
            <div className="lg:col-span-6 flex flex-col animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <header className="mb-6">
                {/* Dummy Ratings */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-[#032b26]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < 4 || (i===4 && "fill-current") ? "fill-[#032b26]" : ""} />
                    ))}
                  </div>
                  <span className="text-[13px] text-on-secondary-container font-body-md">4.8 (124 Reviews)</span>
                </div>

                <h1 className="font-display-lg text-[40px] lg:text-[44px] leading-tight mb-2 text-primary">
                  {productDetials?.product_name}
                </h1>
                
                <p className="font-body-md text-on-secondary-container mb-6 text-[15px]">
                  {productDetials?.description?.split('.')[0] + '.'}
                </p>

                <p className="font-body-md text-[14px] text-on-secondary-container leading-relaxed mb-6">
                  {productDetials?.description}
                </p>

                {selectedVariant && (
                  <p className="font-body-md text-[40px] text-[#032b26] mb-8 font-medium">
                    ${selectedVariant.price}
                  </p>
                )}
                
                <div className="h-px w-full bg-outline-variant/30 mb-8"></div>
              </header>

              {/* Variants Selection */}
              {productDetials?.variants && productDetials?.variants.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-body-sm font-bold text-[13px] text-primary mb-3">
                    Size: <span className="font-normal text-on-secondary-container">{selectedVariant?.size}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {productDetials?.variants.map((v) => (
                      <button
                        key={v.variant_id}
                        onClick={() => setSelectedVariant(v)}
                        className={`h-11 px-6 font-body-md text-[14px] transition-all border rounded-[4px] ${
                          selectedVariant?.variant_id === v.variant_id
                            ? "bg-white text-[#032b26] border-[#032b26] ring-1 ring-[#032b26]"
                            : "bg-white text-on-secondary-container border-outline-variant hover:border-primary/50"
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                  {selectedVariant && (
                    <p className={`font-body-sm text-xs mt-3 ${selectedVariant.stock > 0 ? "text-on-secondary-container" : "text-error"}`}>
                      {selectedVariant.stock > 0
                        ? `${selectedVariant.stock} units currently in stock`
                        : "Temporarily out of stock"}
                    </p>
                  )}
                </div>
              )}

              {/* CTA Section */}
              <div className="flex flex-col gap-3 mb-10">
                <button
                  onClick={selectedVariant?.stock ? addProduct : undefined}
                  disabled={!selectedVariant || selectedVariant?.stock === 0}
                  className="w-full bg-[#032b26] text-white rounded-[6px] py-[18px] font-body-md font-medium text-[15px] hover:bg-[#021f1c] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedVariant?.stock === 0 
                    ? "OUT OF STOCK" 
                    : `Add to Bag — $${selectedVariant?.price || '0.00'}`
                  }
                </button>
                <button className="w-full bg-white border border-outline-variant rounded-[6px] text-primary py-[18px] font-body-md font-medium text-[15px] hover:border-[#032b26] transition-colors">
                  Subscribe & Save 15%
                </button>
              </div>

              {/* Clinical Reveal (Features Card) */}
              <div className="bg-[#f6f7fb] rounded-[8px] p-5 flex flex-col gap-4 border border-outline-variant/30 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-3 text-on-secondary-container">
                  <Beaker size={18} className="text-[#032b26]" strokeWidth={1.5} />
                  <span className="font-body-md text-[14px]">Dermatologist Tested & Approved</span>
                </div>
                <div className="flex items-center gap-3 text-on-secondary-container">
                  <Droplet size={18} className="text-[#032b26]" strokeWidth={1.5} />
                  <span className="font-body-md text-[14px]">Non-comedogenic & Fragrance-Free</span>
                </div>
                <div className="flex items-center gap-3 text-on-secondary-container">
                  <Leaf size={18} className="text-[#032b26]" strokeWidth={1.5} />
                  <span className="font-body-md text-[14px]">Vegan & Cruelty-Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <div className="mt-24 pt-24 border-t border-outline-variant/30 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <ReviewsSection />
          </div>
        </div>
      )}
    </main>
  );
}

function ProductDetialsSkeleton() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 lg:py-24 animate-pulse">
      {/* Breadcrumbs Skeleton */}
      <div className="h-4 w-48 bg-surface-container mb-12"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-16">
        {/* Left: Product Gallery Skeleton */}
        <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-6">
          {/* Thumbnail Strip Skeleton */}
          <div className="flex lg:flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-24 bg-surface-container"></div>
            ))}
          </div>

          {/* Main Feature Image Skeleton */}
          <div className="flex-grow aspect-[4/5] bg-surface-container"></div>
        </div>

        {/* Right: Product Details Skeleton */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="h-4 w-24 bg-surface-container mb-4"></div>
          <div className="h-12 w-full bg-surface-container mb-6"></div>
          <div className="h-8 w-32 bg-surface-container mb-8"></div>
          <div className="h-px w-full bg-outline-variant/30 mb-8"></div>
          <div className="space-y-3 mb-12">
            <div className="h-4 w-full bg-surface-container"></div>
            <div className="h-4 w-full bg-surface-container"></div>
            <div className="h-4 w-2/3 bg-surface-container"></div>
          </div>
          <div className="h-14 w-full bg-surface-container mb-12"></div>
          <div className="space-y-6">
            <div className="h-20 w-full bg-surface-container"></div>
            <div className="h-20 w-full bg-surface-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


function EmptyProductDetails() {
  return (
    <section className="flex flex-col items-center justify-center py-32 px-margin-mobile text-center bg-background">
      <div className="mb-8">
        <span className="material-symbols-outlined text-[64px] text-outline-variant">inventory_2</span>
      </div>
      <h1 className="font-display-lg text-[32px] mb-4 text-primary uppercase tracking-widest">Product Not Found</h1>
      <p className="font-body-md text-on-surface-variant max-w-md mb-8">
        The clinical formulation you are seeking is currently unavailable or has been archived.
      </p>
      <Link to="/products" className="bg-primary text-on-primary px-8 py-4 font-label-caps text-[12px] tracking-[0.2em] hover:opacity-90 transition-opacity">
        BROWSE CATALOG
      </Link>
    </section>
  );
}

