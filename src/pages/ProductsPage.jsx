import ReactPaginate from "react-paginate";
import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import useGetAllProducts from "../hooks/useGetAllProducts";
import useGetCategories from "../hooks/useGetCategories";
import ProductList from "../features/products/ProductList";
import { Search, ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, X } from "lucide-react";

// Same theme map used in CategoriesPage for visual consistency
const CATEGORY_THEMES = {
  Serums:          { gradient: "from-[#0a2e2b] to-[#1a5c55]", icon: "💧" },
  Moisturizers:    { gradient: "from-[#2d1b0e] to-[#6b3a1f]", icon: "🌿" },
  Cleansers:       { gradient: "from-[#0d2b3e] to-[#1a5276]", icon: "✨" },
  Masks:           { gradient: "from-[#1a0a2e] to-[#4a1c6b]", icon: "🌸" },
  "Sun Protection":{ gradient: "from-[#2e2200] to-[#6b5000]",  icon: "☀️" },
  "Eye Care":      { gradient: "from-[#0a2a2e] to-[#0d5460]", icon: "👁" },
  Exfoliators:     { gradient: "from-[#2e1a0a] to-[#6b3d10]", icon: "🔬" },
  Toners:          { gradient: "from-[#0e2e1a] to-[#1e5c36]", icon: "🌱" },
};
const DEFAULT_THEME = { gradient: "from-[#1a1a2e] to-[#2d2d4a]", icon: "✦" };

export default function ProductsPage() {
  const {
    allProduct,
    handleUpdatePageNumber,
    isLoading: isProductsLoading,
    pageNumber,
    pages,
    handleUpdateCategory,
    category,
    handleSearch,
    search,
    handleUpdatePrice,
    maxAndMinPrice,
  } = useGetAllProducts();

  const { categories, isLoading: isCategoriesLoading } = useGetCategories();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortOptions = [
    { value: "-",     label: "Featured"        },
    { value: "-25",   label: "Under $25"       },
    { value: "25-50", label: "$25 – $50"       },
    { value: "50-",   label: "Over $50"        },
  ];

  const currentSortValue = `${maxAndMinPrice.minPrice}-${maxAndMinPrice.maxPrice}`;
  const currentSortLabel = sortOptions.find(o => o.value === currentSortValue)?.label || "Featured";

  const activeCategoryObj = categories?.find(c => c.value === category);
  const activeCategoryLabel = activeCategoryObj ? activeCategoryObj.label : "All Products";

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 lg:py-24 animate-fade-in">

      {/* ── Breadcrumbs ── */}
      <nav className="flex items-center gap-3 mb-10 font-label-caps text-[10px] text-on-secondary-container tracking-widest uppercase animate-fade-in-up">
        <Link to="/" className="hover:text-[#06373A] transition-colors">Home</Link>
        <span className="text-outline-variant">/</span>
        <Link to="/categories" className="hover:text-[#06373A] transition-colors">Categories</Link>
        <span className="text-outline-variant">/</span>
        <Link to="/products" onClick={() => handleUpdateCategory("")} className="hover:text-[#06373A] transition-colors">Shop All</Link>
        {category && (
          <>
            <span className="text-outline-variant">/</span>
            <span className="text-[#06373A]">{activeCategoryLabel}</span>
          </>
        )}
      </nav>

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fade-in-up relative z-50" style={{ animationDelay: '0.05s' }}>
        <div>
          <p className="font-label-caps text-[10px] tracking-[0.3em] text-[#06373A] uppercase mb-3">
            DermaCare Collection
          </p>
          <h1 className="font-display-lg text-[36px] md:text-[48px] text-[#06373A] leading-tight">
            {activeCategoryLabel}
          </h1>
        </div>

        {/* Search + Sort row — top right */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Search */}
          <div className="relative">
            <input
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              placeholder="Search..."
              defaultValue={search}
              className="w-[160px] md:w-[200px] h-10 pl-4 pr-9 border border-outline-variant/50 rounded-full bg-white text-[13px] font-body-md outline-none focus:border-[#06373A] focus:ring-1 focus:ring-[#06373A] transition-all"
            />
            <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
          </div>

          {/* Sort dropdown */}
          <div className="relative z-50" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={`h-10 px-4 border rounded-full bg-white text-[13px] font-body-md font-medium text-[#06373A] flex items-center gap-2 transition-all ${isSortOpen ? 'border-[#06373A] ring-1 ring-[#06373A]' : 'border-outline-variant/50'}`}
            >
              <span>{currentSortLabel}</span>
              <ChevronDown size={14} className={`text-outline transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSortOpen && (
              <div className="absolute right-0 top-full mt-2 w-[160px] bg-white border border-outline-variant/30 rounded-xl shadow-lg overflow-hidden z-50">
                <ul className="py-1.5">
                  {sortOptions.map((opt) => (
                    <li key={opt.value}>
                      <button
                        className={`w-full text-left px-4 py-2.5 text-[13px] font-body-md transition-colors ${currentSortValue === opt.value ? 'bg-[#f3f8f6] text-[#06373A] font-semibold' : 'text-on-secondary-container hover:bg-[#f3f8f6] hover:text-[#06373A]'}`}
                        onClick={() => {
                          const [min, max] = opt.value.split("-");
                          handleUpdatePrice(min, max);
                          setIsSortOpen(false);
                        }}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Browse Categories link */}
          <Link
            to="/categories"
            className="h-10 px-4 border border-outline-variant/50 rounded-full bg-white text-[13px] font-body-md font-medium text-[#06373A] flex items-center gap-2 hover:border-[#06373A] hover:bg-[#f3f8f6] transition-all whitespace-nowrap"
          >
            <LayoutGrid size={14} />
            <span className="hidden md:inline">All Categories</span>
          </Link>
        </div>
      </div>

      {/* ── Categories Mini-Grid (fully visible) ── */}
      <div className="mb-10 animate-fade-in-up relative z-10" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-wrap gap-2">
          {/* All Products pill */}
          <button
            onClick={() => handleUpdateCategory("")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-body-md font-medium transition-all duration-200 ${
              category === ""
                ? "bg-[#032b26] text-white shadow-sm"
                : "bg-white text-on-secondary-container border border-outline-variant/50 hover:border-[#06373A] hover:text-[#06373A]"
            }`}
          >
            <span>All Products</span>
          </button>

          {/* Category pills with mini gradient dot */}
          {!isCategoriesLoading && categories?.map((item) => {
            const theme = CATEGORY_THEMES[item.label] || DEFAULT_THEME;
            const isActive = category === item.value;
            return (
              <button
                key={item.value}
                onClick={() => handleUpdateCategory(item.value)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-body-md font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#032b26] text-white shadow-sm"
                    : "bg-white text-on-secondary-container border border-outline-variant/50 hover:border-[#06373A] hover:text-[#06373A]"
                }`}
              >
                {/* Mini gradient badge */}
                <span className={`inline-block w-2 h-2 rounded-full bg-gradient-to-br ${theme.gradient} flex-shrink-0`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Loading skeleton pills */}
          {isCategoriesLoading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 w-28 rounded-full bg-surface-container animate-pulse" />
          ))}
        </div>
      </div>

      {/* ── Divider + Active Filters ── */}
      <div className="border-t border-outline-variant/30 pt-6 mb-8 flex items-center justify-between">
        <p className="font-body-md text-[13px] text-on-secondary-container">
          {isProductsLoading
            ? "Loading products..."
            : `${allProduct?.length || 0} products${category ? ` in ${activeCategoryLabel}` : ""}`}
        </p>

        {/* Active filter chips */}
        <div className="flex items-center gap-2">
          {category && (
            <button
              onClick={() => handleUpdateCategory("")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#032b26] text-white rounded-full text-[11px] font-medium"
            >
              {activeCategoryLabel}
              <X size={11} />
            </button>
          )}
          {search && (
            <button
              onClick={() => handleSearch("")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container border border-outline-variant/30 text-[#06373A] rounded-full text-[11px] font-medium hover:bg-surface-container-high transition-colors"
            >
              "{search}"
              <X size={11} />
            </button>
          )}
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="flex-1 min-h-[600px] relative z-0">
        <ProductList
          maxPrice={maxAndMinPrice.maxPrice}
          minPrice={maxAndMinPrice.minPrice}
          allProduct={allProduct}
          isLoading={isProductsLoading}
        />
      </div>

      {/* ── Pagination ── */}
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ChevronRight size={17} />}
        previousLabel={<ChevronLeft size={17} />}
        onPageChange={handleUpdatePageNumber}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pages}
        forcePage={pageNumber > 0 ? pageNumber - 1 : 0}
        containerClassName="flex items-center justify-center gap-2 mt-20 pt-10 border-t border-outline-variant/30"
        pageClassName="w-10 h-10 flex items-center justify-center rounded-[6px] border border-transparent text-[14px] font-body-md text-on-secondary-container hover:bg-surface-container transition-colors cursor-pointer"
        activeClassName="!bg-[#032b26] !text-white !border-[#032b26]"
        previousClassName="w-10 h-10 flex items-center justify-center rounded-[6px] border border-outline-variant/30 text-on-secondary-container hover:bg-surface-container transition-colors cursor-pointer"
        nextClassName="w-10 h-10 flex items-center justify-center rounded-[6px] border border-outline-variant/30 text-on-secondary-container hover:bg-surface-container transition-colors cursor-pointer"
        breakClassName="px-2 text-outline"
        disabledClassName="opacity-40 cursor-not-allowed hover:bg-transparent"
      />
    </main>
  );
}
