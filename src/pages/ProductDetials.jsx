import { use, useState } from "react";
import useProductDetials from "../hooks/useProductDetials";
import { CartContext } from "../context/CartContext";
import ReviewsSection from "../features/products/ReviewsSection";
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
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const addProduct = useAddProduct(selectedVariant.variant_id);

  return (
    <main className="bg-background min-h-screen">
      {isError && <EmptyProductDetails />}
      {isLoading && <ProductDetialsSkeleton />}
      {!isLoading && !isError && (
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 lg:py-24">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-3 mb-12 font-label-caps text-[10px] text-on-secondary-container tracking-widest uppercase">
            <Link to="/products" className="hover:text-primary transition-colors">Shop</Link>
            <span className="text-outline-variant">/</span>
            <span className="text-outline-variant">{productDetials?.category?.category_name}</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary">{productDetials?.product_name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-16">
            {/* Left: Product Gallery */}
            <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-6">
              {/* Thumbnail Strip */}
              <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
                {productDetials?.images?.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-20 h-24 flex-shrink-0 border transition-all duration-300 bg-white cursor-pointer ${
                      activeImageIndex === index ? "border-primary opacity-100 shadow-sm" : "border-outline-variant opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`Detail ${index}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>

              {/* Main Feature Image */}
              <div className="flex-grow aspect-[4/5] bg-white border linen-border overflow-hidden relative group flex items-center justify-center">
                {productDetials?.images && productDetials?.images.length > 0 ? (
                  <div className="w-full h-full p-8 md:p-12 lg:p-16 transition-all duration-700 bg-surface-container-low/30">
                    <img
                      src={productDetials?.images[activeImageIndex]?.image_url || productDetials?.images[0].image_url}
                      alt={productDetials?.product_name}
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-surface-container flex items-center justify-center">
                    <span className="text-outline font-label-caps">No image available</span>
                  </div>
                )}
                <div className="absolute top-6 right-6">
                  <span className="bg-primary text-on-primary font-label-caps text-[10px] px-3 py-1 tracking-[0.2em] uppercase">
                    Clinical Grade
                  </span>
                </div>
              </div>
            </div>


            {/* Right: Product Details */}
            <div className="lg:col-span-5 flex flex-col">
              <header className="mb-8">
                <p className="font-label-caps text-[12px] text-on-secondary-container mb-2 uppercase tracking-widest">
                  {productDetials?.category?.category_name}
                </p>
                <h1 className="font-display-lg text-[40px] lg:text-[48px] leading-tight mb-4 text-primary uppercase tracking-tighter">
                  {productDetials?.product_name}
                </h1>
                {selectedVariant && (
                  <p className="font-headline-sm text-[28px] text-primary mb-6">
                    ${selectedVariant.price}
                  </p>
                )}
                <div className="h-px w-full bg-outline-variant/30 mb-8"></div>
                <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
                  {productDetials?.description}
                </p>
              </header>

              {/* Variants Selection */}
              {productDetials?.variants && productDetials?.variants.length > 0 && (
                <div className="mb-10">
                  <h3 className="font-label-caps text-[11px] font-bold uppercase tracking-widest text-primary mb-4">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {productDetials?.variants.map((v) => (
                      <button
                        key={v.variant_id}
                        onClick={() => setSelectedVariant(v)}
                        className={`h-12 px-6 font-label-caps text-[12px] tracking-widest transition-all border ${
                          selectedVariant?.variant_id === v.variant_id
                            ? "bg-primary text-on-primary border-primary"
                            : "bg-white text-primary border-outline-variant hover:border-primary"
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                  {selectedVariant && (
                    <p className={`font-body-md text-xs mt-4 ${selectedVariant.stock > 0 ? "text-on-surface-variant" : "text-error"}`}>
                      {selectedVariant.stock > 0
                        ? `${selectedVariant.stock} units currently in stock`
                        : "Temporarily out of stock"}
                    </p>
                  )}
                </div>
              )}

              {/* CTA Section */}
              <div className="mb-12">
                <button
                  onClick={selectedVariant?.stock ? addProduct : undefined}
                  disabled={!selectedVariant || selectedVariant?.stock === 0}
                  className="w-full bg-primary text-on-primary py-5 font-label-caps text-[14px] tracking-[0.2em] hover:bg-on-surface-variant transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedVariant?.stock === 0 ? "OUT OF STOCK" : "ADD TO REGIMEN"}
                  {selectedVariant?.stock > 0 && (
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  )}
                </button>
              </div>

              {/* Clinical Reveal (Accordion-style Details) */}
              <div className="flex flex-col border-t border-outline-variant/30">
                <div className="py-6 border-b border-outline-variant/30">
                  <div className="w-full flex justify-between items-center text-left">
                    <span className="font-label-caps text-[13px] text-primary tracking-widest font-bold uppercase">Clinical Application</span>
                  </div>
                  <div className="mt-4 font-body-md text-sm text-on-secondary-container leading-relaxed">
                    Apply to cleansed skin using fingertips. Gently pat into the face and neck until fully absorbed. Engineered for daily professional use.
                  </div>
                </div>
                
                <div className="py-6 border-b border-outline-variant/30">
                  <div className="w-full flex justify-between items-center text-left">
                    <span className="font-label-caps text-[13px] text-primary tracking-widest font-bold uppercase">Core Ingredients</span>
                  </div>
                  <div className="mt-4 font-body-md text-sm text-on-secondary-container leading-relaxed">
                    Formulated with high-potency dermatological actives. Dermatologist tested. Paraben free. Fragrance free.
                  </div>
                </div>

                <div className="py-6">
                  <div className="flex items-center gap-4 p-4 bg-secondary-container/20 border-l-2 border-primary">
                    <span className="material-symbols-outlined text-primary text-[24px]">science</span>
                    <div>
                      <p className="font-label-caps text-[11px] text-primary font-bold tracking-widest">MOLECULAR VERIFIED</p>
                      <p className="font-body-md text-secondary text-[12px]">Laboratory tested for stability and efficacy.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <div className="mt-24 pt-24 border-t border-outline-variant/30">
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

